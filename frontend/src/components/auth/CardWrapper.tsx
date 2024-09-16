import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
 } from "../ui/card";
import { BackButton } from "./BackButton";
import { Header } from "./Heading";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSocial?: boolean;
}


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonhref,
}: CardWrapperProps ) => {
    return (
        <Card className="w-[400px] shadow-md bg-white">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
          <CardFooter>
            <BackButton
            href = {backButtonhref}
            label = {backButtonLabel}/>
          </CardFooter>
        </Card>
    )
}