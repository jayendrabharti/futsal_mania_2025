"use server";

import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import Payments from "@/models/payments";
import User from "@/models/user";
import Players from "@/models/players";
import Teams from "@/models/teams";

export async function updatePP(newURL){
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        if(!session) {
            throw new Error(`Registration failed`);
        };
        
        const userData = await User.findByIdAndUpdate(session.user.id,{image:newURL});
        
    } catch (error) {
        throw error;
    }
}