"use client";
import { User, Mail, Phone, Trophy, Calendar, Shield } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


export default function Profile(){
  
    const profile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    team: 'Thunder FC',
    position: 'Forward',
    matches: 5,
    goals: 3,
    assists: 2
  };

  const { data: session } = useSession();
  console.log(session);

  const stats = [
    { label: 'Matches', value: profile.matches, icon: Calendar },
    { label: 'Goals', value: profile.goals, icon: Trophy },
    { label: 'Assists', value: profile.assists, icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
            {session?.user?.image
                ?
                <Image
                    src={session?.user?.image}
                    alt='user'
                    width={100}
                    height={100}
                />
                :
                <User className="h-12 w-12 text-gray-400" />
            }
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{session?.user?.name}</h1>
              <p className="text-blue-200">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="h-5 w-5 text-gray-400" />
              <span>{session?.user?.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="h-5 w-5 text-gray-400" />
              <span>{session?.user?.phone || "Not available"}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {/* <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Tournament Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4"
              >
                <div className="p-3 bg-gray-600 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-200">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
