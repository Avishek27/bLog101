import { CircleMinus, Ellipsis, MessageCircle, Pocket, Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Separator } from "../ui/separator";

export default function BlogCard(){
    return (
        <>
        <section className="w-full flex justify-between items-center">
            <div className="flex flex-col">
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <HoverCard >
                <HoverCardTrigger asChild>
                   <Button variant="link">@nextjs</Button>
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
            <div className="text-4xl font-bold pt-5 w-full">
                How biased is your Regression Model?
            </div>
            <div className="text-xl text-gray-500 pt-3">
               A deep dive into the causes, effects, and remedies for bias in regression models
            </div>
            <div className="flex justify-between pt-5 gap-y-3">
                 <div className="flex items-center space-x-5 p-3">
                    <Star/>
                    <div className="text-sm">
                    15 hrs ago
                    </div>
                    <ThumbsUp/>
                    <MessageCircle/>
                 </div>
                 <div className="flex items-center space-x-10 p-3 bg-muted">
                      <CircleMinus/>
                      <Pocket/>
                      <Ellipsis/>
                 </div>
             </div>
            </div>
            <div>
                <img width="160" height="107" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*Sn2ShxUQIcQBA_RGVr8K6g.png" alt="blogImage"/>
            </div>
        </section>
        <Separator className="my-4 bg-slate-300"/>
        </>
    )
} 