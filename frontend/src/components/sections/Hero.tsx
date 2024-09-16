import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/signin');
  }
    return (
        <div className="bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')] h-screen w-full">
          <span className="flex flex-col pl-[75px] pt-[75px] gap-y-1">
          <h2 className="text-[70px] md:text-[106px] leading-[95px]   font-serif">Human <br/> stories & ideas</h2>
          <h4 className="text-3xl leading-8 font-serif pt-7 mt-10 font-medium">A place to read, write, and deepen your understanding</h4>          </span>
          <div className="pl-[75px] mt-7 pt-7">
          <Button 
          onClick={handleClick}
          className="bg-black
           text-white
            hover:text-black 
            rounded-md text-xl" variant={"default"} size={"lg"}>Start Reading</Button>
          </div>
        </div>
    )
}