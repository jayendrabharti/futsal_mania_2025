"use client";
import { useRouter } from "next/navigation"
export default function Matches(){
    return(
        <div className="flex h-full w-full">
            <iframe 
                src="https://challonge.com/futsal_mania_2025_iqlipse/module" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="auto" 
                allowtransparency="true"
            ></iframe>
        </div>
    )
}