"use client";

import { Trophy } from "lucide-react";

export default function Matches(){
    return(
        <div className="h-full w-full">
            <h1 className="bg-[#252525] flex flex-row p-4 text-3xl items-center font-bold justify-center">
                <Trophy className="mr-2 size-8"/>
                Matches
            </h1>
            <iframe 
                src="https://challonge.com/futsal_mania_2025_iqlipse/module" 
                width="100%" 
                height="100%" 
                style={{ border: "none",padding: 0,margin:0}} 
                allow="fullscreen"
            ></iframe>
        </div>
    )
}