import { Prisma, PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
//@ts-ignore
import { updatePost ,createPost ,signinInput ,signupInput } from  "@avi_0912/blog101common";

 
const express = require("express");
const app = express();

app.use(express.json());
app.use(cookieParser());

const prisma = new PrismaClient();
interface SignupBody {
    email: string,
    password: string,
    name?: string,
}

interface SignupBody extends Express.Request{
    body: SignupBody,
}
const JWT_SECRET = process.env.JWT_SECRET || "default";
interface SigninBody {
    email: string,
    password: string,
}
interface SigninBody extends Express.Request{
    body: SigninBody,
}
app.post('/api/v1/signup', async (req: SignupBody,res:any) =>{

   const body =  req.body;
   const {success} = signupInput.safeParse(body);
   if(!success){
    return res.status(403).json({
        message: "Invalid input (zod error)",
    })
   }
   try {
    const password = body.password;
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {
        id: uuidv4(),
        email: body.email,
        password: hashedPassword,
        name: body.name,
    }
    const user = await prisma.user.create({
        data: {
            id:newUser.id,
            email: newUser.email,
            password: newUser.password,
            name: newUser.name,
        }
    });
    const token = jwt.sign({id: newUser.id},JWT_SECRET,{expiresIn: "1hr"});
    res.cookie("token", token,{httpOnly: true});
    return res.status(201).json({
        message: "JWT here",
        token
    })
   }
   catch{
   console.error();
   
    return {
        message: "Signup error code: 403"
    }
   }
});

app.post('/api/v1/signin',async (req: SigninBody,res:any)=>{
   const {email,password} = req.body;
   //@ts-ignore
   const { success } = signinInput.safeParse(body);
   if(!success){
    return res.status(403).json({
        message: "Invalid input (zod error)",
    })
   }
   try {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    
    
    if(!user){
        return res.status(401).json({
            message: "USER NOT FOUND",
        })
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        console.log("wrong password");
        return res.status(401).json({
            message: "PASSWORD DOES NOT MATCH",
        })
    }
    const token = jwt.sign({id: user.id},JWT_SECRET,{expiresIn: "1hr"});
    res.cookie("token", token,{httpOnly: true});
    return res.status(201).json({
        message: "JWT here",
        token
    })
   }catch{
    console.error();
    return {
        message: "Trouble signing in",
    }
   }

});

//middleware logic
// check if the user who is accessing the particular route is signed in or not
// if yes then allow
// if no then automatically redirect to signin route


interface middlewareReq {
    userId: String,
}
interface middlewareReq extends Express.Request {
    body : middlewareReq,
}

app.use('/api/v1/blog/*',async (req: any,res: any,next: any) => {
    const token = req.cookies.token;
    

    if(!token){
        return res.status(401).json({
            message: "UNAUTHORIZED",
        });
    }
    try{

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if(!decoded){
        return  res.status(401).json({
          message: "UNAUTHORIZED",
        });
    }

    req.userId = decoded.id;
    await next();
    }catch{
      console.error();
      return res.status(401).json({
        message: "UNAUTHORIZED",
      });
    }
});
interface blogPost {
    title: string,
    content: string,
    authorId: string,
}

app.post('/api/v1/blog/post',async (req: any,res:any)=>{

    const { title, content } = req.body;
    const userid = (req as any).userId;
    //@ts-ignore
    const { success } = createPost.safeParse(body);
   if(!success){
    return res.status(403).json({
        message: "Invalid input (zod error)",
    })
   }
    
    try{
    const user = await prisma.user.findUnique({
        where: {
            id: userid,
        }
    });
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userid,
            }
        });
        return res.status(200).json({
            id: post.id,
        })
    } catch (error) {
        console.error('Blog post error:', error);
        return res.status(500).json({ message: "ERROR WHILE BLOG POSTING", error: Error});
    }
});

app.put('/api/v1/blog/update',async (req: any,res:any)=>{
    const { title, content,id } = req.body;
    const userid = (req as any).userId;
    //@ts-ignore
    const { success } = updatePost.safeParse(body);
   if(!success){
    return res.status(403).json({
        message: "Invalid input (zod error)",
    })
   }
    try{
    const user = await prisma.user.findUnique({
        where: {
            id: userid,
        }
    });
        const post = await prisma.post.update({
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
    } catch (error) {
        console.error('Blog post error:', error);
        return res.status(500).json({
             message: "ERROR WHILE BLOG POSTING",
              error: Error
            });
    }
});

app.get('/api/v1/blog/:id',async (req: any,res: any)=>{
   const id = req.param('id');
   try{
   const post = await prisma.post.findUnique({
    where:{
        id,
    }
   });
   return res.status(200).json({
    message: "POST FOUND!",
    post
   });
}catch{
    console.error();
    return res.status(404).json({
        message: "BLOG IS NOT FOUND",
    });
    
}
});

app.get('/api/v1/blog/',async (req: any,res: any)=>{
    try{
        const posts = await prisma.post.findMany();
       return res.status(200).json({
        message: "BLOGS FOUND",
        posts
    });
}catch{
    console.error();
    return res.status(404).json({
        message: "BLOGS NOt FOUND",
    })
}
});

app.post('/api/v1/logout', (req:any,res: any)=> {
    res.cookie("token","ads");
    res.json({
        message: "LOGOUT SUCCESSFULLY",
    })
});


app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})




