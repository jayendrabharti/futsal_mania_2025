"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy } from 'lucide-react';

export default function Matches({children}) {

    const pathname = usePathname();

    const tabs = [
        { path: '/matches/live', label: 'Live Matches' },
        { path: '/matches/upcoming', label: 'Upcoming' },
        { path: '/matches/completed', label: 'Completed' },
    ];

    return(
        <div
            className="text-4xl flex flex-col justify-center items-center font-bold"
        >Soon Available</div>
    )

    return (
        <div className="max-w-full w-7xl mx-auto px-4 py-8 overflow-y-scroll">
            <div className="flex items-center space-x-4 mb-8">
                <Trophy className="h-8 w-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Match Center</h1>
            </div>

            <div className="mb-8">
                <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <Link key={tab.path} href={tab.path}
                                className={`px-4 py-2 rounded-md font-medium text-gray-400 ${(pathname.includes(tab.path))? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                        >
                        
                                {tab.label}
                        </Link>
                    ))}
                </nav>
            </div>
            {children}
            {/* Content for the selected tab will be rendered here */}
        </div>
    );
}