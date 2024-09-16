import BlogCard from "@/components/sections/BlogCard";
import Navbar from "@/components/sections/Navbar";
import StaffPicks from "@/components/sections/StaffPicks";
import { Separator } from "@/components/ui/separator";

export default function Blog() {
    return (
        <section >
            <Navbar/>
        <div className="grid grid-cols-10 mx-10 px-[35px]">
        <div className="col-span-10 md:col-span-7 px-[35px] py-10 mr-10">
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        </div>
        <div className="col-span-3 flex">
        <Separator orientation="vertical" className="bg-slate-300"/>
        <StaffPicks/>
        </div>
       
       </div>
        </section>
      
    )
}