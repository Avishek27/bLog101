import Hero from "@/components/sections/Hero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signin');
  }
    return (
        <>
       <div className="flex items-center justify-between p-5 bg-slate-100">
           <h1 className="text-6xl font-Dmserif">Medium</h1>
        
        <div className="flex items-center space-x-5 p-2 mr-2">
          <div className="hidden md:block text-2xl font-semibold font-Dmserif cursor-pointer">
            About Us
          </div>
          <div
          onClick={handleClick}
           className="hidden md:block text-2xl font-semibold font-Dmserif cursor-pointer">
            Sign In
          </div>
          <Button size={"lg"}
          onClick={handleClick}
           className="bg-green-600 font-Dmserif
            text-white text-lg
             hover:text-black 
             rounded-lg ">Getting Started</Button>
        </div>
       </div>
       <Separator orientation="horizontal" className="bg-slate-300"/>
        <Hero/>
        
       </>
    )
}