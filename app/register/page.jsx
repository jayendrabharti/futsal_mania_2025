"use client";
import Link from "next/link";
import { User, Users } from "lucide-react";
// import { signIn, useSession, getProviders } from 'next-auth/react';
// import { useState, useEffect } from "react";

export default function Page() {

    // const { data: session } = useSession();
    // useEffect(()=>{
    //     const setUpProviders = async () => {
    //         const response = await getProviders();
    //         setProviders(response);
    //     } 
    //     setUpProviders();
    // },[]);
    // const [providers, setProviders] = useState(null);

    // if(!session?.user)return(
    //     <div className="flex flex-col w-full h-full justify-center items-center">
    //         <span className="text-2xl font-bold">You need to Sign In to access this page</span>
    //         {providers && 
    //         Object.values(providers).map((provider,index)=>(
    //         <button
    //             key={index}
    //             className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 mt-5 flex flex-row items-center justify-center border border-gray-600 bg-zinc-900 cursor-pointer active:scale-90 scale-100"
    //             onClick={() => signIn(provider.id)}
    //         >
    //             Sign In with Google 
    
    //             <svg className="size-8 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
    //                 <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    //             </svg>
            
    //         </button>
    //         ))}
    //     </div>
    // )

    return (
        <div className="flex flex-col items-center overflow-y-scroll space-y-8 md:space-y-16 px-4 py-4">
            <span className="text-2xl md:text-4xl font-bold text-center mt-2">
                Choose Registration Type
            </span>

            <span className="font-bold text-2xl text-green-500">Offers Valid till 11 Apr - 12pm</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full md:max-w-2xl">

                <Link href="/register/team" className="flex flex-col items-center justify-center bg-sky-600 rounded-2xl p-6 md:p-10 transition-all duration-100 active:scale-90 hover:ring-2">
                    <Users size={36} className="size-20" />
                    <span className="mt-4 text-base md:text-lg font-semibold text-center">Team Registration</span>
                    <span className="text-lg font-bold line-through">₹ 599 /-</span>
                    <span className="text-2xl font-bold">₹ 399 /-</span>
                    <span className="text-xs md:text-sm text-center">
                        5 - 8 players ( 5 playing at a time )
                    </span>
                </Link>
                
                <Link href="/register/individual" className="flex flex-col items-center justify-center bg-zinc-600 rounded-2xl p-6 md:p-10 transition-all duration-100 active:scale-90 hover:ring-2">
                    <User size={36} className="size-20" />
                    <span className="mt-4 text-base md:text-lg font-semibold text-center">Individual Registration</span>
                    <span className="text-lg font-bold line-through">₹ 99 /-</span>
                    <span className="text-2xl font-bold">₹ 79 /-</span>
                    <span className="text-xs md:text-sm text-center">
                        Will be put in a team by organizers.
                    </span>
                </Link>

            </div>

            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 text-sm md:text-base">
                <p className="text-yellow-700 dark:text-yellow-300 text-center">
                    Note: It is recommended to register as a team if possible.
                </p>
            </div>

        </div>
    );
}
