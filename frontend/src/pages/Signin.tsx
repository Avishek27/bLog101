import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useState, useTransition } from "react";

import { FormError } from "@/components/sections/FormError";
import { FormSuccess } from "@/components/sections/FormSuccess";
import {  useNavigate } from "react-router-dom";


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;


export const login = async (values: SigninType,navigate: (path: string) => void) => {
    
    try{
       const response = await axios.post("https://blog101-2h4y.onrender.com/api/v1/signin",values);
       if(response.data){
        navigate('/blog');
        return {
            success: "Sign in Successful"
        }
       }
    }catch{
        return {
            error: "Sign in failed"
        }
    }
}




export default function Signin(){

    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
     const [isPending,startTransition] = useTransition();

     const navigate = useNavigate();
    const form = useForm<SigninType>({
        resolver: zodResolver(signinInput),
        defaultValues: {
           email: "",
           password: "",
        }
    });

     function onSubmit(values: SigninType){
        
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values,navigate)
            .then((data)=>{
                if (data) { 
                    if (data.error) {
                        setError(data.error);
                    } else if (data.success) {
                        setSuccess(data.success);
                    }
                } else {
                    setError("Unexpected error occurred.");
                }
                console.log("Your code is on onSubmit");
            })
            .catch(() => {
                setError("An error occurred during sign up.");
            });
            });
       
    }

    return (
        <div className = "flex flex-col items-center justify-center h-screen bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80')]">
             <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonhref="/signup">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                   <FormField
                   control={form.control}
                   name = "email"
                   render = {({ field }) => (
                    <FormItem>
                       <FormLabel>Email or Username</FormLabel>
                       <FormControl>
                        <Input placeholder="johnDoe@email.com" {...field} type="email" disabled={isPending}/>
                       </FormControl>
                       <FormMessage/>
                    </FormItem>
                   )}
                   />
                   <FormField
                   control={form.control}
                   name = "password"
                   render = {({ field }) => (
                    <FormItem>
                       <FormLabel>Password</FormLabel>
                       <FormControl>
                        <Input placeholder="1234@abc" {...field} type="password" disabled={isPending}/>
                       </FormControl>
                       <FormMessage/>
                    </FormItem>
                   )}
                   />
                   
                   <Button 
                   className="w-full bg-green-500 text-white hover:text-black"
                   size={"lg"} >Sign In</Button>
                   <FormError message={error}/>
                   <FormSuccess message={success}/>
                </form>
            </Form>
    </CardWrapper>
        </div>
    )
}