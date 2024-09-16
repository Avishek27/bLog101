import Header from "@/components/sections/Header";

export default function CreateBlog(){
    return (
        <>
        <Header/>
        <div className="flex flex-col items-center mx-[100px] px-[100px]">
        <textarea className="bg-white text-6xl w-full h-[100px] font-Dmserif overflow:auto border-transparent placeholder-slate-500 placeholder-opacity-75" placeholder="Title"/>
        <textarea className="bg-white border-none text-2xl w-full h-[100px] font-Dmserif placeholder-slate-500 placeholder-opacity-75" placeholder="Tell your story...."/>
        </div>
        </>
    )
}