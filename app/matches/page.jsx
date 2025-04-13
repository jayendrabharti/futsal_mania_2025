"use client"

import { useState } from "react"
import { ChevronRight, Trophy } from "lucide-react"

export default function BracketPage() {
  // Sample bracket data
  const [bracketData, setBracketData] = useState({
    rounds: [
      {
        roundName: "Quarter Finals",
        matches: [
          {
            team1: { name: "Team Alpha", score: 3, winner: true },
            team2: { name: "Team Beta", score: 1, winner: false },
            live: false,
          },
          {
            team1: { name: "Team Gamma", score: 2, winner: true },
            team2: { name: "Team Delta", score: 0, winner: false },
            live: false,
          },
          {
            team1: { name: "Team Epsilon", score: 1, winner: false },
            team2: { name: "Team Zeta", score: 2, winner: true },
            live: false,
          },
          {
            team1: { name: "Team Eta", score: 4, winner: true },
            team2: { name: "Team Theta", score: 2, winner: false },
            live: false,
          },
        ],
      },
      {
        roundName: "Semi Finals",
        matches: [
          {
            team1: { name: "Team Alpha", score: 2, winner: false },
            team2: { name: "Team Gamma", score: 3, winner: true },
            live: false,
          },
          {
            team1: { name: "Team Zeta", score: 1, winner: false },
            team2: { name: "Team Eta", score: 2, winner: true },
            live: true,
          },
        ],
      },
      {
        roundName: "Finals",
        matches: [
          {
            team1: { name: "Team Gamma", score: 0, winner: false },
            team2: { name: "Team Eta", score: 0, winner: false },
            live: false,
          },
        ],
      },
    ],
  })

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8 overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Tournament Bracket
        </h1> */}

        <div className="flex flex-col md:flex-row justify-center gap-4 overflow-x-auto">
          {bracketData.rounds.map((round, roundIndex) => (
            <div key={roundIndex} className="flex-1 min-w-[280px] flex flex-col max-w-[400px]">
              <h2 className="text-xl font-semibold mb-4 text-center py-2 bg-zinc-800 rounded-t-lg">
                {round.roundName}
              </h2>
              <div className="flex flex-col gap-8 h-full justify-around">
                {round.matches.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    className={`relative rounded-lg border ${
                      match.live ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-zinc-700"
                    } bg-zinc-800 p-1 transition-all duration-300`}
                  >
                    {match.live && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-xs font-bold text-black px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        LIVE
                      </div>
                    )}
                    <div className="flex flex-col">
                      <TeamDisplay team={match.team1} isWinner={match.team1.winner} />
                      <div className="flex items-center">
                        <div className="h-px bg-zinc-700 flex-grow"></div>
                        <span className="px-2 text-zinc-500 text-sm">VS</span>
                        <div className="h-px bg-zinc-700 flex-grow"></div>
                      </div>
                      <TeamDisplay team={match.team2} isWinner={match.team2.winner} />
                    </div>
                    {roundIndex < bracketData.rounds.length - 1 && (
                      <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 text-zinc-600">
                        <ChevronRight className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamDisplay({ team, isWinner }) {
  return (
    <div
      className={`flex items-center justify-between py-0.5 px-3 rounded-md ${
        isWinner ? "bg-gradient-to-r from-zinc-700 to-zinc-800" : "bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-2">
        {isWinner && <Trophy className="h-4 w-4 text-yellow-400" aria-hidden="true" />}
        <span className={`font-medium ${isWinner ? "text-white" : "text-zinc-300"}`}>{team.name}</span>
      </div>
      <div className={`text-lg font-bold ${isWinner ? "text-yellow-400" : "text-zinc-400"}`}>{team.score}</div>
    </div>
  )
}