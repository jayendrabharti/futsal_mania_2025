"use client";

import { CalendarDays, CircleUserRound, Cpu, Gamepad2, House,  Info,  Lock,  LogOut, Menu, Play, ScrollIcon, Table, Trophy, UserPlus, Users, X } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import Image from "next/image";
import heroImage from "@/public/images/heroImage.png";

const pages = [
    { id: 1, name: "Home", href: "/", icon: House },
    // { id: 2, name: "Teams", href: "/teams", icon: Users },
    { id: 3, name: "Schedule", href: "/schedule", icon: CalendarDays },
    { id: 4, name: "Rules", href: "/rules", icon: ScrollIcon },
    { id: 5, name: "Matches", href: "/matches", icon: Gamepad2 },
    // { id: 6, name: "Register", href: "/register", icon: UserPlus },
];

export default function Navbar(){

    const [providers, setProviders] = useState(null);
    const [menu,setMenu] = useState({open: false});
    const router = useRouter();
    const [expanded,setExpanded] = useState(false);

    const pathname = usePathname();
    const currentPage = pathname.split('/')[1];


    useEffect(()=>{
        const setUpProviders = async () => {
          const response = await getProviders();
          setProviders(response);
        } 
        setUpProviders();
      },[]);

    const { data: session } = useSession();

    useEffect(()=>{
        const handleClick = (e) => {
            if (!e.target.closest(".relative")) {
                setMenu({open: false});
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    },[])

return (
    <div className="sticky top-0 flex flex-row lg:flow-row justify-between items-center w-full p-4 mx-auto bg-[#222] shadow-md  border-b border-gray-600 z-50"
        onClick={()=>setExpanded(false)}
    >
        <button 
            onClick={(e)=>{
                setExpanded(prev=>!prev)
                e.stopPropagation();
            }}
            className="flex lg:hidden p-2 bg-zinc-900 transition-all duration-100 active:scale-50 rounded-2xl"
        >
            {expanded
            ?
            <X className="size-8"/>
            :
            <Menu className="size-8"/>
            }
        </button>

        <Image
            src={heroImage}
            alt="logo"
            height={80}
            width={80}
            className="lg:ml-2"
        />

        <div className="hidden lg:flex flex-row space-x-2 z-[100]">
        {pages.map((page,index) => (
        <Link 
            key={index}
            href={page.href} 
            className={`active:scale-90 text p-2 my-2 hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row ${currentPage === page.href.split('/')[1] ? "text-[#66f]" : "text-gray-400 hover:text-[#66f]"}`}
        >
            <page.icon
                className="mr-2"
            />
            <span>{page.name}</span>
        </Link>
        ))}
        <Link
            href={'/register'} 
            className={`active:scale-90 text p-2 my-2 bg-[#66f] hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row text-gray-100 hover:text-[#66f]`}
        >
            <UserPlus
                className="mr-2"
            />
            <span>Register</span>
        </Link>
        </div>


        <div className={`z-50 absolute lg:hidden flex flex-col bg-[#222] border-b border-gray-700 top-full space-x-2 w-full left-0 transition-all duration-200 overflow-hidden p-2 ${expanded? "scale-y-100 translate-y-0" : "-translate-y-1/2 scale-y-0"}`}>
        {pages.map((page,index) => (
        <Link 
            key={index}
            href={page.href} 
            className={`active:scale-90 text p-2 my-2 hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row ${currentPage === page.href.split('/')[1] ? "text-[#66f]" : "text-gray-400 hover:text-[#66f]"}`}
        >
            <page.icon
                className="mr-2"
            />
            <span>{page.name}</span>
        </Link>
        ))}
        <Link
            href={'/register'} 
            className={`active:scale-90 text p-2 my-2 bg-[#66f] hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row text-gray-100 hover:text-[#66f]`}
        >
            <UserPlus
                className="mr-2"
            />
            <span>Register</span>
        </Link>
        </div>

        <div className="z-50 lg:mr-2">
        {session?.user 
        ? 
        <div
         className={`cursor-pointer relative rounded-xl transition-all duration-300 flex flex-row items-center justify-center ${menu.open ? "bg-zinc-800" : "bg-zinc-900"}`}
         onClick={()=>{setMenu(prev=>({open: !prev.open}))}}
        >
            <Image
                src={session.user.image} 
                alt={session.user.name} 
                width={100}
                height={100}
                className="size-12 rounded-full active:scale-90 transition-all duration-300"
            />

            <div className={`space-y-2 absolute p-2 border border-gray-600 bg-zinc-900 top-full mt-2 right-0 rounded-xl w-max overflow-hidden transition-all  duration-100 ${menu.open ? "scale-y-100 scale-x-100 translate-y-0 translate-x-0" : "scale-y-0 scale-x-0 translate-x-1/2 -translate-y-1/2"}`}>
                
                <div className="flex flex-col items-center p-2">
                    <span>{session.user.name}</span>
                    <span className="text-sm text-zinc-500">{session.user.email}</span>
                </div>
                
                <Link
                    href={`/profile`}
                    className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 flex flex-row w-full cursor-pointer active:scale-90"
                >
                    <CircleUserRound className="mr-2"/>
                    Your Profile
                </Link>
                
                {session.user.isAdmin &&
                <Link
                    href={`/admin`}
                    className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 flex flex-row w-full cursor-pointer active:scale-90"
                >
                    <Lock className="mr-2"/>
                    Admin Dashboard
                </Link>}

                <button
                    className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 flex flex-row w-full cursor-pointer active:scale-90"
                    onClick={signOut}
                >
                    <LogOut className="mr-2"/>
                    Sign Out
                </button>

            </div>

        </div>
        :
        <>
        {providers && 
        Object.values(providers).map((provider,index)=>(
        <button
            key={index}
            className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 mt-auto flex flex-row items-center justify-center border border-gray-600 bg-zinc-900 cursor-pointer active:scale-90 scale-100"
            onClick={() => signIn(provider.id)}
        >Sign In&nbsp;<span className="hidden lg:flex">with Google</span> 

        <svg className="size-8 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>

        </button>
        ))}
        </>}
        </div>

    </div>
)    
}