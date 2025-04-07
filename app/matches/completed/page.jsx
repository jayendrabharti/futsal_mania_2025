import React from 'react';


export default function CompletedMatches() {
  const matches = [
    {
      id: 1,
      date: 'March 15, 2025',
      team1: { name: 'Thunder FC', score: 3 },
      team2: { name: 'Royal Knights', score: 2 },
      highlights: ['Goal by John (15\')', 'Goal by Smith (34\')', 'Goal by Mike (42\')']
    }
  ];

  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <div key={match.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <div className="px-6 py-3 bg-blue-600 text-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">COMPLETED</span>
              <span>{match.date}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
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

            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-300">Match Highlights</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                {match.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {matches.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No completed matches yet
        </div>
      )}
    </div>
  );
};
