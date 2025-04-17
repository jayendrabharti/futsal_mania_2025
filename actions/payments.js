"use server";
import Payments from "@/models/payments";
import User from "@/models/user";
import Players from "@/models/players";
import Teams from "@/models/teams";
import { connectToDB } from "@/utils/database";

export async function GetPayments(){
    
    await connectToDB();
    const payments = await Payments.find().populate("user");

    return JSON.stringify(payments);

}

export async function UpdatePaymentStatus(paymentId, newStatus){
    await connectToDB();
    const data = await Payments.findByIdAndUpdate(paymentId,{ status : newStatus })

    if(data)return true;
    return false;
};