import { authOptions } from "@/utils/authOptions"
import { Ban } from "lucide-react";
import { getServerSession } from "next-auth"
import Link from "next/link";

export default async function AdminLayout({children}) {

    const session = await getServerSession(authOptions);
    
    if(!session){
        return(
            <div className="w-full h-full flex justify-center items-center flex-col">
                <span className="text-3xl font-bold">You need to Log in to access this page</span>
            </div>
        )
    }

    if(!session.user.isAdmin){
        return(
            <div className="w-full h-full flex justify-center items-center flex-col">
                <span className="text-4xl font-bold flex flex-row items-center text-red-600">
                    Access Denied
                    <Ban className=" ml-2 size-10"/>
                </span>
                <span>( Only Admins have access to this page )</span>
            </div>
        )
    }

    return(  
        <div className="w-full h-full grid grid-cols-[auto_1fr] overflow-y-scroll">
            
            <div className="bg-zinc-800 p-4">
            <Link 
                    href={'/admin/payments'}
                    className={`active:scale-90 text py-2 px-4 my-2 hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row text-gray-400 hover:text-[#66f] bg-zinc-900`}
                >Payments</Link>
            <Link 
                    href={'/admin/teams'}
                    className={`active:scale-90 text py-2 px-4 my-2 hover:bg-zinc-700 rounded-xl transition-all duration-100 flex flex-row text-gray-400 hover:text-[#66f] bg-zinc-900`}
                >Teams and Players</Link>
            </div>
            
            <div>
                {children}
            </div>

        </div>
    )
}