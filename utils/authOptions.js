import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Players from "@/models/players";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {

            await connectToDB();

            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();
            session.user.phone = sessionUser.phone;
            session.user.image = sessionUser.image;
            return session;
        },
        async signIn({ profile }) {
            console.log(profile);
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email: profile?.email
                });
 
                if (!userExists && profile) {

                    try {
                        const playerData = await Players.findOne({ email: profile.email });

                        const userData = await User.create({
                            email: profile.email,
                            name: profile.name,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture || "",
                            isRegistered: !!playerData,
                        });

                        if (playerData) {
                            await Players.findOneAndUpdate(
                                { email: profile.email },
                                { user: userData._id }
                            );
                        }
                    } catch (err) {
                        console.error("Error during user creation or player update:", err);
                        throw new Error("Failed to create user or update player data.");
                    }
                }
                return true;

            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};