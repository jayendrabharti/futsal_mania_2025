'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetTeamById } from '@/actions/teams';
import { LoaderCircle } from 'lucide-react';

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
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [teamId]);

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
        <div className="p-4">
            <h1 className=''>{data.teamName}</h1>
            {/* <h1 className="text-2xl font-bold mb-4">Team: {data.teamName}</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Captain</h2>
                <div className="p-4 border rounded-md">
                    <p><strong>Name:</strong> {data.captain.name}</p>
                    <p><strong>Email:</strong> {data.captain.email}</p>
                    <p><strong>Phone:</strong> {data.captain.phone || 'N/A'}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Players</h2>
                <div className="space-y-4">
                    {data.players.map((player) => (
                        <div key={player._id} className="p-4 border rounded-md">
                            <p><strong>Name:</strong> {player.name}</p>
                            <p><strong>Email:</strong> {player.email}</p>
                            <p><strong>Phone:</strong> {player.phone}</p>
                            <p><strong>Registration No:</strong> {player.info.regNo}</p>
                            <p><strong>Year:</strong> {player.info.year}</p>
                            <p><strong>Course:</strong> {player.info.course}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}