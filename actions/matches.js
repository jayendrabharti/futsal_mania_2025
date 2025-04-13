"use server";

import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import Payments from "@/models/payments";
import User from "@/models/user";
import Players from "@/models/players";
import Teams from "@/models/teams";
import Matches from "@/models/matches";

export async function getMatches(){
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        if(!session) {
            throw new Error(`Registration failed`);
        };
        
        const data = await Matches.find();
        return data[0].data;
        
    } catch (error) {
        throw error;
    }
}

export async function UpdateMatches(newData){
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        if(!session) {
            throw new Error(`Registration failed`);
        };
        
        const match = await Matches.find();
        const updatedData = JSON.stringify(newData);
        const data = await Matches.findByIdAndUpdate(match[0]._id, { data: updatedData });

    } catch (error) {
        throw error;
    }
}