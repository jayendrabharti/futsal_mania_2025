import nodemailer from 'nodemailer';
import ConfirmationMailBody from '@/utils/ConfirmationMailBody';

export default async function SendConfirmation(data){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_APP_PASSWORD,
        },
    });

    const mailData = await transporter.sendMail({
        from: `Iqlipse ${process.env.SENDER_EMAIL}`,
        to: data.email,
        subject: "Confirming your registration to FUTSAL MANIA 2025",
        html: ConfirmationMailBody({
            teamText: data.teamText,
            name: data.name,
            regNo: data.regNo,
            email: data.email,
            phone: data.phone,
        })
    })

}