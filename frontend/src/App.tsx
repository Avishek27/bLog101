import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";

export  function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element = {<Signup/>}/>
      <Route path="/signin" element = {<Signin/>}/>
      <Route path="/blog" element = {<Blog/>}/>
      <Route path="/createblog" element = {<CreateBlog/>}/>
      <Route path="/" element = {<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}