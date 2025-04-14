"use client";

import { AtSign, LoaderCircle, Phone, User, Users } from 'lucide-react';
import { GetTeamsAndPlayers } from '@/actions/teams';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import avatar from "@/public/images/avatar.jpg"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Teams() {

    const [isLoading,setIsLoading] = useState(true);
    const [teams,setTeams] = useState([]);
    const [individualPlayers,setIndividualPlayers] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const getData = async()=>{
            const data = JSON.parse(await GetTeamsAndPlayers());
            console.log(data.teamsData);
            setTeams(data.teamsData);
            setIndividualPlayers(data.playersData);
            setIsLoading(false);
        };
        getData();
    },[])

    const getStatusColor = (status) => {
        switch (status) {
            case "verified":
                return "bg-green-500"
            case "verification-pending":
                return "bg-yellow-500"
            case "flagged":
                return "bg-red-500"
            case "refunded":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }
    
    return (
        <div>
        {teams.map((team,index)=>(
            <div key={index} className='mb-10'>
                <span
                    className='text-2xl'
                >{index+1}. <b>{team.teamName}</b></span>
                <div>
                {team.players.map((p,index)=>(
                    <p key={index} className='ml-6'>
                        <span>{p.name} {index==0?<b>(C)</b>:""} {p.info.regNo}</span><br />                    
                    </p>
                ))}
                </div>
            </div>
        ))}
        </div>
    );
}
