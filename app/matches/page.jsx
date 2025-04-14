"use client"

import { LoaderCircle, RefreshCcw, Trophy } from "lucide-react"
import { getMatches } from "@/actions/matches";
import { useEffect, useState } from "react";

export default function BracketPage() {
  // Sample bracket data
  const [bracketData, setBracketData] = useState({rounds: []});
  const [isLoading,setIsLoading] = useState(true);

  const getData = async()=>{
    setIsLoading(true);
    const data = JSON.parse(await getMatches());
    setBracketData(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="text-white overflow-y-scroll p-2">
      <div className="max-w-7xl mx-auto mt-5">
        <button
          className="bg-zinc-700 text-xl px-3 py-2 justify-center items-center flex flex-row rounded-2xl m-4 ml-auto sticky top-0 left-0 transition-all duration-150 active:scale-90"
          onClick={getData}
        > 
          {isLoading?"Reloading ...":"Reload"}
          <RefreshCcw className={`size-6 ml-2 ${isLoading ? "animate-spin":""}`}/>
        </button>
        
        <div className="flex flex-row gap-8 w-full h-full">
          {isLoading && <LoaderCircle className="fixed top-1/3 bg-black left-1/2 -translate-x-1/2 animate-spin size-14"/>}
          {bracketData.rounds.map((round, roundIndex) => (
            <div key={roundIndex} className="flex-1 min-w-[280px] flex flex-col max-w-[400px]">
              <h2 className="text-xl font-semibold mb-4 text-center py-2 bg-zinc-700 rounded-t-lg">
                {round.roundName}
              </h2>
              <div className="flex flex-col gap-4 h-full justify-start">
                {round.matches.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    className={`relative rounded-lg border ${
                      match.live ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-zinc-700"
                    } bg-zinc-900 p-1 transition-all duration-300`}
                  >
                    {match.date && 
                      <span className="absolute right-1/2 translate-x-1/2 translate-y-1/2 bottom-full bg-black px-2 rounded-full">{match.date}</span>
                    }
                    <span className="absolute bg-zinc-900 top-1/2 -translate-y-1/2 right-[calc(100%+1px)] p-1 pl-3 rounded-l-full aspect-square">{matchIndex+1}</span>
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
        isWinner ? "bg-gradient-to-r from-black to-zinc-900" : "bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`font-medium ${isWinner ? "text-white" : "text-zinc-300"}`}>{team.name}</span>
        {isWinner && <Trophy className="size-5 text-yellow-400" aria-hidden="true" />}
      </div>
      <div className={`text-lg font-bold ${isWinner ? "text-yellow-400" : "text-zinc-400"}`}>{team.score}</div>
    </div>
  )
}