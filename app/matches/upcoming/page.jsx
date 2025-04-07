import React from 'react';
import { Calendar } from 'lucide-react';


export default function UpcomingMatches() {
  const matches = [
    {
      id: 1,
      date: 'March 15, 2025',
      time: '2:00 PM',
      team1: { name: 'Golden Eagles' },
      team2: { name: 'Blue Dragons' },
      venue: 'Court A'
    }
  ];

  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <div key={match.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <div className="px-6 py-3 bg-gray-700 text-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">UPCOMING</span>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{match.date} - {match.time}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-100">{match.team1.name}</h3>
              </div>
              <div className="text-2xl font-bold text-gray-500 px-4">VS</div>
              <div className="text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-100">{match.team2.name}</h3>
              </div>
            </div>

            <div className="mt-4 text-center text-gray-400">
              Venue: {match.venue}
            </div>
          </div>
        </div>
      ))}

      {matches.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No upcoming matches scheduled
        </div>
      )}
    </div>
  );
};
