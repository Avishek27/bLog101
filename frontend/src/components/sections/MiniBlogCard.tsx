import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export default function MiniBlogCard(){
    return (
        <div className="flex-col space-y-2 pt-5 mt-3">
        <div className="flex justify-between items-center">
           
            <HoverCard >
                <HoverCardTrigger asChild>
                    <div className="flex justify-between">
                    <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                   <Button variant="link">@nextjs</Button>
                   
                  </div>
                    </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-white rounded-md">
                            <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                <h4 className="text-xl font-semibold">@nextjs</h4>
                                <Button color="black">Follow</Button>
                                </div>
                                
                                <p className="text-sm pt-2">
                                The React Framework – created and maintained by @vercel.
                                </p>
                                <div className="flex items-center pt-2">
                                
                                <span className="text-xs text-muted-foreground">
                                    Joined December 2021
                                </span>
                                </div>
                            </div>
                            </div>
                        </HoverCardContent>
                                    </HoverCard>
        </div>
        <div className="text-2xl font-bold">
                <h3>Goodbye, Atomic Habits</h3>
            </div>
        </div>
    )
}