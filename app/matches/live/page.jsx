import React from 'react';
import { Timer } from 'lucide-react';


export default function LiveMatches() {
  const matches = [
    {
      id: 1,
      team1: { name: 'Phoenix Rising', score: 2 },
      team2: { name: 'Silver Hawks', score: 2 },
      currentTime: '35:00'
    },
    {
      id: 2,
      team1: { name: 'Thunder FC', score: 1 },
      team2: { name: 'Blue Dragons', score: 0 },
      currentTime: '15:30'
    }
  ];

  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <div key={match.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <div className="px-6 py-3 bg-green-600 text-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">LIVE</span>
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-2" />
                <span>{match.currentTime}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-100">{match.team1.name}</h3>
                <p className="text-3xl font-bold text-gray-100">{match.team1.score}</p>
              </div>
              <div className="text-2xl font-bold text-gray-500 px-4">VS</div>
              <div className="text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-100">{match.team2.name}</h3>
                <p className="text-3xl font-bold text-gray-100">{match.team2.score}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {matches.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No live matches at the moment
        </div>
      )}
    </div>
  );
};
