"use server";

import Players from "@/models/players";
import Teams from "@/models/teams";
import User from "@/models/user";

import { connectToDB } from "@/utils/database";

export async function GetTeams() {
    await connectToDB();

    await User.countDocuments();
    
    const teamsData = await Teams.find()
    .populate("captain")
    .populate({
        path: "players",
        populate: {
            path: "user"
        }
    });
    
    return JSON.stringify(teamsData);
}

export async function GetTeamPlayers(id) {
    await connectToDB();
    
    const players = await Players.find({ team: id });
    
    return JSON.stringify(players);
}

export async function GetIndividualPlayers() {
    await connectToDB();

    await User.countDocuments();

    const playersData = await Players.find({isIndividual: true})
        .populate("user");

    return JSON.stringify(playersData);
}