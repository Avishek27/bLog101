"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express = require("express");
const app = express();
app.use(express.json());
app.use((0, cookie_parser_1.default)());
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default";
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const password = body.password;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = {
            id: (0, uuid_1.v4)(),
            email: body.email,
            password: hashedPassword,
            name: body.name,
        };
        const user = yield prisma.user.create({
            data: {
                id: newUser.id,
                email: newUser.email,
                password: newUser.password,
                name: newUser.name,
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1hr" });
        res.cookie("token", token, { httpOnly: true });
        return res.status(201).json({
            message: "JWT here",
            token
        });
    }
    catch (_a) {
        console.error();
        return {
            message: "Signup error code: 403"
        };
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (!user) {
            return res.status(401).json({
                message: "USER NOT FOUND",
            });
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            console.log("wrong password");
            return res.status(401).json({
                message: "PASSWORD DOES NOT MATCH",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1hr" });
        res.cookie("token", token, { httpOnly: true });
        return res.status(201).json({
            message: "JWT here",
            token
        });
    }
    catch (_b) {
        console.error();
        return {
            message: "Trouble signing in",
        };
    }
}));
app.use('/api/v1/blog/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "UNAUTHORIZED",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "UNAUTHORIZED",
            });
        }
        req.userId = decoded.id;
        yield next();
    }
    catch (_c) {
        console.error();
        return res.status(401).json({
            message: "UNAUTHORIZED",
        });
    }
}));
app.post('/api/v1/blog/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userid = req.userId;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: userid,
            }
        });
        const post = yield prisma.post.create({
            data: {
                title,
                content,
                authorId: userid,
            }
        });
        return res.status(200).json({
            id: post.id,
        });
    }
    catch (error) {
        console.error('Blog post error:', error);
        return res.status(500).json({ message: "ERROR WHILE BLOG POSTING", error: Error });
    }
}));
app.put('/api/v1/blog/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, id } = req.body;
    const userid = req.userId;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: userid,
            }
        });
        const post = yield prisma.post.update({
            where: {
                id: id,
                authorId: userid,
            },
            data: {
                title,
                content,
                authorId: userid,
            }
        });
        return res.status(201).json({
            message: "BLOG UPDATED SUCCESSFULLY",
            post
        });
    }
    catch (error) {
        console.error('Blog post error:', error);
        return res.status(500).json({
            message: "ERROR WHILE BLOG POSTING",
            error: Error
        });
    }
}));
app.get('/api/v1/blog/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.param('id');
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id,
            }
        });
        return res.status(200).json({
            message: "POST FOUND!",
            post
        });
    }
    catch (_d) {
        console.error();
        return res.status(404).json({
            message: "BLOG IS NOT FOUND",
        });
    }
}));
app.get('/api/v1/blog/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        console.log(posts);
        return res.status(200).json({
            message: "BLOGS FOUND",
            posts
        });
    }
    catch (_e) {
        console.error();
        return res.status(404).json({
            message: "BLOGS NOt FOUND",
        });
    }
}));
app.post('/api/v1/logout', (req, res) => {
    res.cookie("token", "ads");
    res.json({
        message: "LOGOUT SUCCESSFULLY",
    });
});
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
