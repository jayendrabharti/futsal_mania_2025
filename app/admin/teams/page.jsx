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
            console.log(data);
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
        <div className="px-4 py-8 flex flex-col">
            
            <div className="flex items-center space-x-4 mb-8">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Participating Teams
                    <span>({teams.length})</span>
                </h1>
            </div> 

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && <LoaderCircle className='size-12 animate-spin mx-auto'/>}
                {!teams.length && !isLoading && <span className='mx-auto text-2xl text-gray-600'>No teams Yet</span>}
                {teams.map((team, index) => (
                    <div 
                        key={index} 
                        className="border-4 border-zinc-700 rounded-lg p-4 flex flex-col bg-zinc-800 shadow-lg hover:bg-zinc-700 space-y-2 cursor-pointer"
                        onClick={()=>router.push(`/admin/teams/${team._id}`)}
                    >
                            
                            <span className="text-2xl font-bold text-white mx-auto cursor-pointer">{team.teamName}</span>
                            <hr className='bg-zinc-600'/>
                            {/* captain */}
                            <div className='flex flex-row justify-start items-center'>
                                <Image
                                    src={team?.players[0]?.user?.image || avatar}
                                    alt={team?.players[0]?.name || 'captain'}
                                    width={100}
                                    height={100}
                                    className='rounded-full size-14 mr-2'
                                />
                                <div className='flex flex-col'>
                                   <span className='text-base text-white'>{team?.players[0]?.name}</span>
                                   <span className='text-xs text-zinc-400'>{team?.players[0]?.category.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'><AtSign/></span>
                                <span>{team.players[0].email}</span>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'><Phone/></span>
                                <span>{team.players[0].phone || "N/A"}</span>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'>Team Members:</span>
                                <span>{team.players.length}</span>
                            </div>

                            <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'>Payment Status:</span>
                                <span 
                                    className={`${getStatusColor(team?.payment?.status)} px-1 rounded-full`}
                                >{team?.payment?.status}</span>
                            </div>

                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-4 mt-12 mb-8">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Individual Players
                    <span>({individualPlayers.length})</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && <LoaderCircle className='size-12 animate-spin mx-auto'/>}
                {!individualPlayers.length && !isLoading && <span className='mx-auto text-2xl text-gray-600'>No Individual Players Yet</span>}
                {individualPlayers.map((p, index) => (
                    <div key={index} className="border-4 border-zinc-700 rounded-lg p-4 flex flex-col bg-zinc-800 shadow-lg hover:bg-zinc-700 space-y-2 cursor-pointer">
                        
                        <div className='flex flex-row justify-start items-center'>
                            <Image
                                src={p?.user?.image || avatar}
                                alt={p.name || "player"}
                                width={100}
                                height={100}
                                className='rounded-full size-14 mr-2'
                            />
                            <div className='flex flex-col'>
                                <span className='text-base text-white'>{p?.name}</span>
                                <span className='text-xs text-zinc-400'>{p?.category.toUpperCase()}</span>
                            </div>
                        </div>

                        
                        <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'><AtSign/></span>
                                <span 
                                    className={` px-1 rounded-full`}
                                >{p?.email}</span>
                        </div>

                                                
                        <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'><Phone/></span>
                                <span 
                                    className={` px-1 rounded-full`}
                                >{p?.phone}</span>
                        </div>

                                                
                        <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'>Payment Status:</span>
                                <span 
                                    className={`${getStatusColor(p?.payment?.status)} px-1 rounded-full`}
                                >{p?.payment?.status}</span>
                        </div>

                    </div>
                ))}
            </div>

            
        </div>
    );
}
