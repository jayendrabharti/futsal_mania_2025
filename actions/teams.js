"use server";

import Players from "@/models/players";
import Teams from "@/models/teams";
import User from "@/models/user";
import Payments from "@/models/payments";

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

export async function GetTeamById(id) {

    await connectToDB();
    
    const teamData = await Teams.findById(id)
    .populate("captain")
    .populate({
        path: "players",
        populate: {
            path: "user"
        }
    });
    
    return JSON.stringify(teamData);
}

export async function GetIndividualPlayers() {
    await connectToDB();

    await User.countDocuments();

    const playersData = await Players.find({isIndividual: true})
        .populate("user");

    return JSON.stringify(playersData);
}

export async function GetTeamsAndPlayers() {

    await connectToDB();
    
    const teamsData = await Teams.find()
    .populate("captain")
    .populate({
        path: "players",
        populate: {
            path: "user"
        }
    })
    .populate("payment");
    
    const playersData = await Players.find({isIndividual: true})
        .populate("user")
        .populate("payment");

    return JSON.stringify({teamsData,playersData});

}
