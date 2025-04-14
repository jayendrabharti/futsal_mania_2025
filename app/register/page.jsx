"use client";
import Link from "next/link";
import { User, Users } from "lucide-react";

export default function Page() {

    return (
        <div className="flex flex-col items-center overflow-y-scroll space-y-8 md:space-y-16 px-4 py-4">
            <span className="text-2xl md:text-4xl font-bold text-center mt-2">
                Choose Registration Type
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full md:max-w-2xl">

                <Link href="/register/team" className="flex flex-col items-center justify-center bg-sky-600 rounded-2xl p-6 md:p-10 transition-all duration-100 active:scale-90 hover:ring-2">
                    <Users size={36} className="size-20" />
                    <span className="mt-4 text-base md:text-lg font-semibold text-center">Team Registration</span>
                    <span className="text-2xl font-bold">₹ 599 /-</span>
                    <span className="text-xs md:text-sm text-center">
                        5 - 8 players ( 5 playing at a time )
                    </span>
                </Link>
                
                <Link href="/register/individual" className="flex flex-col items-center justify-center bg-zinc-600 rounded-2xl p-6 md:p-10 transition-all duration-100 active:scale-90 hover:ring-2">
                    <User size={36} className="size-20" />
                    <span className="mt-4 text-base md:text-lg font-semibold text-center">Individual Registration</span>
                    <span className="text-2xl font-bold">₹ 99 /-</span>
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
