"use client"

import { useEffect, useState } from "react"
import { Plus, Save, Trophy, X, Trash, ChevronDown, ChevronUp } from "lucide-react"
import { getMatches, UpdateMatches } from "@/actions/matches";

export default function BracketPage() {
    const [bracketData, setBracketData] = useState({ rounds: [] });
    const [editingMatch, setEditingMatch] = useState(null);

    const handleSaveMatch = (updatedMatch) => {
        if (editingMatch === null) return;

        setBracketData(prev => {
            const newData = { ...prev };
            newData.rounds[editingMatch.roundIndex].matches[editingMatch.matchIndex] = updatedMatch;
            return newData;
        });
    };

    const handleAdd = (roundIndex) => {
        setBracketData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const newMatch = {
                team1: { name: "New Team 1", score: 0, winner: false },
                team2: { name: "New Team 2", score: 0, winner: false },
                live: false,
            };
            newData.rounds[roundIndex].matches.push(newMatch);
            return newData;
        });
    };

    const handleDeleteMatch = (roundIndex, matchIndex) => {
        setBracketData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.rounds[roundIndex].matches.splice(matchIndex, 1);
            return newData;
        });
    };

    const addRound = () => {
        const roundName = prompt("Enter round Name:");
        if (!roundName) return;
        const newRound = {
            roundName: roundName,
            matches: []
        };
        setBracketData(prev => ({
            ...prev,
            rounds: [...prev.rounds, newRound]
        }));
    };

    const handleDeleteRound = (roundIndex) => {
        setBracketData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            newData.rounds.splice(roundIndex, 1);
            return newData;
        });
    };
    
    const save = async () => {
        await UpdateMatches(bracketData);
    };

    useEffect(() => {
        const getData = async () => {
            const data = JSON.parse(await getMatches());
            setBracketData(data);
        };
        getData();
    }, []);


    const moveMatchUp = (roundIndex, matchIndex) => {
        if (matchIndex === 0) return;
        setBracketData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const matches = newData.rounds[roundIndex].matches;
            [matches[matchIndex - 1], matches[matchIndex]] = [matches[matchIndex], matches[matchIndex - 1]];
            return newData;
        });
    };
    
    const moveMatchDown = (roundIndex, matchIndex) => {
        setBracketData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const matches = newData.rounds[roundIndex].matches;
            if (matchIndex === matches.length - 1) return newData;
            [matches[matchIndex + 1], matches[matchIndex]] = [matches[matchIndex], matches[matchIndex + 1]];
            return newData;
        });
    };
    
    return (
        <div className="text-white overflow-y-scroll p-2">
            <div className="flex flex-row gap-4 sticky top-0 left-0">
                <Plus
                    className="bg-zinc-600 p-1 rounded-md size-10 duration-150 transition-all active:scale-75"
                    onClick={addRound}
                />
                <Save
                    className="bg-zinc-600 p-1 rounded-md size-10 duration-150 transition-all active:scale-75"
                    onClick={save}
                />
            </div>

            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex flex-row gap-8 w-full h-full">
                    {bracketData.rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="flex-1 min-w-[280px] flex flex-col max-w-[400px]">
                            <h2 className="flex flex-row items-center justify-center text-xl font-semibold mb-4 text-center py-2 bg-zinc-700 rounded-t-lg">
                                {round.roundName}
                                <Plus
                                    className="ml-2 bg-[rgba(0,0,0,.5)] size-10 p-2 rounded-lg transition-all duration-150 active:scale-75"
                                    onClick={() => handleAdd(roundIndex)}
                                />
                                <Trash
                                    className="ml-2 bg-[rgba(0,0,0,.5)] size-10 p-2 rounded-lg transition-all duration-150 active:scale-75 text-red-500"
                                    onClick={() => handleDeleteRound(roundIndex)}
                                />
                            </h2>
                            <div className="flex flex-col gap-4 h-full justify-start">
                                {round.matches.map((match, matchIndex) => (
                                    <div
                                        key={matchIndex}
                                        className={`relative rounded-lg border ${
                                            match.live ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : "border-zinc-700"
                                        } bg-zinc-900 p-1 transition-all duration-300`}
                                        onClick={() => setEditingMatch({
                                            roundIndex,
                                            matchIndex,
                                            match
                                        })}
                                    >
                                        {match.date && 
                                            <span className="absolute right-1/2 bottom-full translate-y-1/2 translate-x-1/2 bg-black px-2 rounded-full">{match.date}</span>
                                        }
                                        <span className="absolute bg-zinc-900 top-1/2 -translate-y-1/2 right-[calc(100%+1px)] p-1 pl-3 rounded-l-full aspect-square">{matchIndex + 1}</span>
                                        <Trash
                                            className="absolute bottom-1/2 translate-y-1/2 right-10 rounded-md bg-zinc-800 p-2 size-10 text-red-500 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMatch(roundIndex, matchIndex);
                                            }}
                                        />
                                        <div className="absolute bg-zinc-700 top-1/2 -translate-y-1/2 left-2/3 p-2 py-1 rounded-2xl">
                                            <ChevronUp 
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    moveMatchUp(roundIndex,matchIndex)
                                                }}
                                            />
                                            <ChevronDown 
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    moveMatchDown(roundIndex,matchIndex)
                                                }}
                                            />
                                        </div>
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
            {editingMatch && (
                <MatchEditor
                    match={editingMatch.match}
                    onClose={() => setEditingMatch(null)}
                    onSave={handleSaveMatch}
                />
            )}
        </div>
    );
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
    );
}

function MatchEditor({ match, onClose, onSave }) {
    const [editedMatch, setEditedMatch] = useState({ ...match });

    const handleSave = () => {
        if (editedMatch.team1.winner) {
            editedMatch.team2.winner = false;
        } else if (editedMatch.team2.winner) {
            editedMatch.team1.winner = false;
        }
        onSave(editedMatch);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 rounded-lg p-6 w-[400px] shadow-xl text-zinc-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit Match</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Team 1</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={editedMatch.team1.name}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team1: { ...editedMatch.team1, name: e.target.value },
                                    })
                                }
                                className="flex-1 border border-zinc-600 bg-zinc-700 rounded px-3 py-2 text-zinc-200"
                            />
                            <input
                                type="number"
                                value={editedMatch.team1.score}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team1: { ...editedMatch.team1, score: parseInt(e.target.value) || 0 },
                                    })
                                }
                                className="w-20 border border-zinc-600 bg-zinc-700 rounded px-3 py-2 text-zinc-200"
                            />
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editedMatch.team1.winner}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team1: { ...editedMatch.team1, winner: e.target.checked },
                                        team2: { ...editedMatch.team2, winner: false },
                                    })
                                }
                                className="rounded border-zinc-600 bg-zinc-700 text-zinc-400 focus:ring-zinc-500"
                            />
                            <span className="text-sm text-zinc-400">Winner</span>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Team 2</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={editedMatch.team2.name}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team2: { ...editedMatch.team2, name: e.target.value },
                                    })
                                }
                                className="flex-1 border border-zinc-600 bg-zinc-700 rounded px-3 py-2 text-zinc-200"
                            />
                            <input
                                type="number"
                                value={editedMatch.team2.score}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team2: { ...editedMatch.team2, score: parseInt(e.target.value) || 0 },
                                    })
                                }
                                className="w-20 border border-zinc-600 bg-zinc-700 rounded px-3 py-2 text-zinc-200"
                            />
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editedMatch.team2.winner}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        team2: { ...editedMatch.team2, winner: e.target.checked },
                                        team1: { ...editedMatch.team1, winner: false },
                                    })
                                }
                                className="rounded border-zinc-600 bg-zinc-700 text-zinc-400 focus:ring-zinc-500"
                            />
                            <span className="text-sm text-zinc-400">Winner</span>
                        </label>
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={editedMatch.live}
                                onChange={(e) =>
                                    setEditedMatch({
                                        ...editedMatch,
                                        live: e.target.checked,
                                    })
                                }
                                className="rounded border-zinc-600 bg-zinc-700 text-zinc-400 focus:ring-zinc-500"
                            />
                            <span className="text-sm text-zinc-400">Live Match</span>
                        </label>
                    </div>
                </div>
                
                <label>Date & Time&nbsp;</label>
                <input
                    type="text"
                    value={editedMatch.date?editedMatch.date:""}
                    onChange={(e) =>
                        setEditedMatch({
                            ...editedMatch,
                            date: e.target.value,
                        })
                    }
                    className="flex-1 border border-zinc-600 bg-zinc-700 rounded px-3 py-2 text-zinc-200"
                />


                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-zinc-600 text-zinc-200 rounded hover:bg-zinc-500"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}