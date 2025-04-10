"use server";

import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import User from "@/models/user";
import Teams from "@/models/teams";
import Players from "@/models/players";
import Payments from "@/models/payments";
import SendConfirmation from "./sendConfirmation";


export async function RegisterIndividual(data) {
    try {

        const session = await getServerSession(authOptions);
        if(!session) {
            throw new Error(`Registration failed`);
        };

        await connectToDB();

        const paymentData = await Payments.create({
            transactionId: data.transactionId,
            imageUrl: data.paymentImageURL,
            user: session.user.id,
            amount: 99,
            type: "individual"
        });

        const playerData = await Players.create({
            category: "player",
            isIndividual: true,
            team: null,
            user: session.user.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            info: {
                regNo: data.regNo,
                year: data.year,
                course: data.course,
            },
            payment: paymentData._id
        })

        await SendConfirmation({
            teamText: "Individual Registrations",
            name: data.name,
            regNo: data.regNo,
            email: data.email,
            phone: data.phone,
        });

        if(playerData){

            await User.findByIdAndUpdate(session.user.id,{ isRegistered: true })

            return JSON.stringify(playerData);
        }

    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}

export async function RegisterTeam(data){
    try {
        const captain = { ...data.captain, category: "captain" };
        const players = data.players.map(p => ({ ...p, category: "player" }));
        const substitutes = data.substitutes.map(p => ({ ...p, category: "player" }));

        const teamList = [
            captain,
            ...players,
            ...substitutes,
        ];
        
        await connectToDB();

        const session = await getServerSession(authOptions);

        if(!session) {
            throw new Error(`Registration failed`);
        };

        const paymentData = await Payments.create({
            transactionId: data.transactionId,
            imageUrl: data.paymentImageURL,
            user: session.user.id,
            amount: 599,
            type: "team",
        });

        for (const p of teamList) {
            let pdata = await User.findOne({ email: p.email });
            if (pdata?.isRegistered) {
                throw new Error(`${p.email} is already registered`);
            }
        }
 
        const teamData = await Teams.create({
            teamName: data.teamName,
            captain: session.user.id,
            isGeneratedTeam: false,
            payment: paymentData._id,
        })

        let playerIds = [];

        for (const p of teamList) {

            let userData = await User.findOne({ email: p.email });
            if (userData) {
                await User.findByIdAndUpdate(userData._id, { isRegistered: true });
            }

            const playerData = await Players.create({
                category: p.category,
                isIndividual: false,
                team: teamData._id,
                user: userData ? userData._id : null,
                name: p.name,
                email: p.email,
                phone: p.phone,
                info: {
                    regNo: p.regNo,
                    year: p.year,
                    course: p.course,
                }
            });

            playerIds.push(playerData._id);
        }
        console.log(playerIds);
        
        // send confirmation mail
        for (const p of teamList){
            await SendConfirmation({
                teamText: `Team Name: ${data.teamName}`,
                name: p.name,
                regNo: p.regNo,
                email: p.email,
                phone: p.phone,
            });
        }

        await Teams.findByIdAndUpdate(teamData._id,{players: [...playerIds]});

        if(teamData){
            return JSON.stringify(teamData);
        }

    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}

export async function CheckRegistered() {
    try {

        const session = await getServerSession(authOptions);
        if(!session) {
            throw new Error(`Not logged In`);
        };

        await connectToDB();
        const userData = await User.findById(session.user.id);

        return JSON.stringify(userData.isRegistered);

    } catch (error) {
        throw new Error(`Could not check: ${error.message}`);
    }
}

export async function GetAllPlayerEmailIds() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error(`Not logged In`);
        }

        await connectToDB();

        const players = await Players.find({}, { email: 1, _id: 0 });
        const emailIds = players.map(player => player.email);

        return JSON.stringify(emailIds);
    } catch (error) {
        throw new Error(`Could not fetch player email IDs: ${error.message}`);
    }
}
