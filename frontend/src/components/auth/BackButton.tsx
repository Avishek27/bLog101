import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface BackButtonProps {
    label: string;
    href: string;
}


export const BackButton = ({
    label,
    href,
}: BackButtonProps) => {
    
    return (
        <Button
           variant={"link"}
           asChild
           size={"sm"}
           className="font-normal w-full">
            <Link to={href}>
            {label}
            </Link>
            
            
        </Button>
    )
}