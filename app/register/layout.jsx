"use client";
import { CheckRegistered } from "@/actions/registeration";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from 'next-auth/react';


export default function RegisterLayout({children}){
    
    
        const { data: session } = useSession();
        const [isRegistered,setIsRegistered] = useState(false);
        const [providers, setProviders] = useState(null);

        useEffect(()=>{
            const setUpProviders = async () => {
                const response = await getProviders();
                setProviders(response);
            } 
            setUpProviders();
        },[]);

        useEffect(()=>{
            const check = async ()=>{
                const result = await JSON.parse(await CheckRegistered());
                setIsRegistered(result);
                console.log(result)
            }
            if(session?.user)check();
        },[session?.user])

    // return(
    //     <div className="flex flex-col w-full h-full justify-center items-center">
    //         <span className="text-2xl font-bold">Continuing Registrations soon</span>  
    //     </div>
    // )
        
    if(!session?.user)return(
        <div className="flex flex-col w-full h-full justify-center items-center">
            <span className="text-2xl font-bold">You need to Sign In to access this page</span>
            {providers && 
            Object.values(providers).map((provider,index)=>(
            <button
                key={index}
                className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 mt-5 flex flex-row items-center justify-center border border-gray-600 bg-zinc-900 cursor-pointer active:scale-90 scale-100"
                onClick={() => signIn(provider.id)}
            >
                Sign In with Google 
    
                <svg className="size-8 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                    <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
            
            </button>
            ))}
        </div>
    )

    // const isRegistered = JSON.parse(await CheckRegistered());
    
    if(isRegistered){
        return(
        <div className='flex flex-col justify-center h-full w-full items-center'>
            <span className='text-2xl text-green-400 flex flex-row mb-4'>You are Successfully registered<ThumbsUp className='ml-2'/></span>
            <Link 
                href={'/dashboard'}
                className='py-2 px-4 hover:bg-gray-900 bg-gray-700 transition-all duration-100 active:scale-90 rounded-full'
            >Go to Dashboard</Link>
        </div>
        )
    }
    // else{
    //     return(
    //     <div className='flex flex-col justify-center h-full w-full items-center'>
    //         <span className='text-5xl text-blue-400 font-bold flex flex-row mb-4'>Registrations are Closed</span>
    //         <span className="text-lg">
    //             Stay updated with future event at&nbsp;
    //             <a href="https://iqlipse.space" target="_blank" className="underline text-blue-800 font-bold text-2xl">Iqlipse</a>
    //         </span>
    //     </div>
    //     )
    // }

    return children;
}