import { Bell, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, 
    DropdownMenuContent,
    
     DropdownMenuItem, 
      DropdownMenuRadioGroup, 
      DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function Header(){
    return (
        <div className="flex justify-between p-7 mx-7">
            <div className="flex items-center space-x-3 pl-4">
                <h1 className="font-Dmserif text-6xl">Medium</h1>
                <p className="text-xl">Draft saved to sahaavi</p>
            </div>
            <div className="flex items-center space-x-7">
               <Button className="bg-green-500 rounded-md text-lg text-white hover:text-black" size={"lg"}>Publish</Button>
               <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Ellipsis className="cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup>
          <DropdownMenuItem>
           Hints and Keyboard Shortcuts
          </DropdownMenuItem>
          <DropdownMenuItem>
           Hints and Keyboard Shortcuts
          </DropdownMenuItem>
          <DropdownMenuItem>
           Hints and Keyboard Shortcuts
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuItem>
           Hints and Keyboard Shortcuts
          </DropdownMenuItem>
        <DropdownMenuItem>
           Hints and Keyboard Shortcuts
        </DropdownMenuItem>
        <DropdownMenuItem>
           Hints and Keyboard Shortcuts
        </DropdownMenuItem>
          
      </DropdownMenuContent>
    </DropdownMenu>
              
               <Bell/>
               <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}