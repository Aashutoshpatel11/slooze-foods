import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function GET(request:Request){
    const cookieStore = await cookies() 
    await connectDB()
    try {


        cookieStore.set('token', "", {httpOnly:true, secure: true} )

        return Response.json(
            {
                data: {},
                message: "User logged out successfully",
                success: true
            },
            {status: 200}
        )

    } catch (error:any) {
        console.log("Error logging-out user::", error);
        throw new Error(error);
    }
}