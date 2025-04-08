import { User, Users } from 'lucide-react';
import { GetIndividualPlayers, GetTeams } from '@/actions/teams';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import avatar from "@/public/images/avatar.jpg"
import PlayerCard from '@/components/PlayerCards';
import Image from 'next/image';

export default async function Teams() {

    const teams = JSON.parse(await GetTeams());
    const individualPlayers = JSON.parse(await GetIndividualPlayers());
    console.log(teams)
    return (
        <div className="overflow-y-scroll px-4 py-8">
            <div className="flex items-center space-x-4 mb-8">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Participating Teams</h1>
            </div> 

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teams.map((team, index) => (
                    <div key={index} className="border-4 border-zinc-700 rounded-lg p-4 flex flex-col justify-center items-center bg-zinc-800 shadow-lg">
                        <div className="flex flex-row p-2 pb-6">
                            <AnimatedTooltip 
                                items={team.players.map((player, index) => ({
                                    id: player._id || index,
                                    name: player.name || `Player${index + 1}`,
                                    designation: player.category.toUpperCase(),
                                    image: player?.user?.image || avatar
                                }))}
                            />                        
                        </div>
                        <span className="text-xl p-2 font-bold text-white">{team.teamName}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-4 mt-12 mb-8">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Individual Players</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {individualPlayers.map((p, index) => (
                    <div key={index} className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-lg">
                        <Image
                            src={p?.user?.image || avatar}
                            width={100}
                            height={100}
                            alt={p.name}
                            className="rounded-full"
                        />
                        <span className="mt-2 text-white font-medium">{p?.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-blue-50 dark:bg-blue-900 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Team Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Minimum 5 players, maximum 8 players per team</li>
                    <li>All players must be 18 years or older</li>
                    <li>Teams must have matching uniforms with numbers</li>
                    <li>Each team must designate a captain</li>
                    <li>Registration deadline: March 1, 2025</li>
                </ul>
            </div>
        </div>
    );
}
