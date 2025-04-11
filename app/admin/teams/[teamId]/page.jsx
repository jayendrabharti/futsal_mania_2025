'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetTeamById } from '@/actions/teams';
import { AtSign, Crown, IndianRupee, LoaderCircle, Phone,Users } from 'lucide-react';
import avatar from "@/public/images/avatar.jpg"
import Image from 'next/image';

export default function TeamPage() {
    const { teamId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = JSON.parse(await GetTeamById(teamId));
                setData(result);
                console.log(result);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [teamId]);

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

    if (isLoading)
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoaderCircle className="animate-spin inset-0 size-14" />
            </div>
        );

    if (error)
        return (
            <div className="flex w-full h-full justify-center items-center">
                <span className="text-red-500">{error.message}</span>
            </div>
        );

    return (
        <div className="flex flex-col">
            <h1 className='text-3xl font-bold mx-auto w-full text-center bg-zinc-800 p-4 top-0'>{data.teamName}</h1>

            <div className="flex items-center space-x-4 p-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Players
                    <span>({data.players.length})</span>
                </h1>
            </div> 

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                {data.players.map((p,index)=>(
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
                                <span className='text-xs text-zinc-400 flex flex-row items-center'>
                                    {p?.category.toUpperCase()}
                                    {p?.category == "captain" && 
                                        <Crown className='size-4 ml-2 fill-amber-300 stroke-amber-300'/>
                                    }
                                </span>
                            </div>
                        </div>

                        
                        <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'>
                                    <AtSign/>
                                </span>
                                <span 
                                    className={` px-1 rounded-full`}
                                >{p?.email}</span>
                        </div>

                                                
                        <div className='flex flex-row justify-between'>
                                <span className='text-zinc-400'>
                                    <Phone/>
                                </span>
                                <span 
                                    className={` px-1 rounded-full`}
                                >{p?.phone}</span>
                        </div>

                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-4 p-4">
                <IndianRupee className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Payment</h1>
                
            </div> 

            <div className='p-4 space-y-2 w-max'>
                <div className='w-full flex justify-between'>
                    <span className='mr-2 text-zinc-400'>Status:</span>
                    <span
                        className={`${getStatusColor(data.payment.status)} rounded-full px-2`}
                        >
                        {data.payment.status}
                    </span>
                </div>
                <div className='w-full flex justify-between'>
                    <span className='mr-2 text-zinc-400'>Transaction ID:</span>
                    <span
                        className={`rounded-full px-2`}
                        >
                        {data.payment.transactionId}
                    </span>
                </div>


                <Image
                    src={data?.payment?.imageUrl}
                    alt='paymentproof'
                    width={400}
                    height={400}
                />


            </div>

        </div>
    );
}