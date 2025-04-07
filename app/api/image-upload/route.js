import { v2 as cloudinary } from 'cloudinary';
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from 'next/server';
// Configuration

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(req){

    const session = await getServerSession(authOptions);
    if(!session) {
        throw new Error(`Registration failed`);
    };
    await connectToDB();

    try {
        const formData = await req.formData();
        const image = formData.get("image");

        if(!image){
            return NextResponse.json({error: "Image not found"},{status: 400});
        }

        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes);

        const result = await new Promise(
            (resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: "futsalImages"},
                    (error,result) => {
                        if(error)reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            }
        );

        return NextResponse.json(
            {
                url: result.url

            },
            {status: 200}
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Image Upload failded"},{status: 500});
    }   
}