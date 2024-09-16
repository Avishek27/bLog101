import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Bell, SquarePen } from 'lucide-react';
import { Separator } from "../ui/separator";

export default function Navbar(){
    return (
        <>
        <nav className="flex justify-between">
          <div className="flex items-center space-x-2 ml-3 p-4">
            <h2 className="font-bold text-4xl font-Dmserif">
            Medium
            </h2>
            <div>
             <SearchInput/>
            </div>
          </div>
          <div className="flex items-center space-x-10 mr-5 p-4">
               <div className="flex items-center space-x-1">
                 <SquarePen/>
                 Write
               </div>
                <Bell/>
            
            <div>
                <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
          </div>
        </nav>
        <Separator orientation="horizontal" className="bg-slate-300"/>
        </>
        
    )
}


export function SearchInput() {
  return (
<form>   
    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" className="block w-full p-4 ps-10 text-sm border-gray-300 rounded-md
         bg-gray-50" placeholder="Search" required />
            </div>
</form>
  )
}