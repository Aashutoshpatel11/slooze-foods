import mongoose from "mongoose";
import { User } from "@/model/user.model";
import { cookies } from "next/headers";
import connectDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";

export async function GET(request: Request){
    await connectDB()
    try {
        const cookieStore = await cookies() 
        const token = cookieStore.get('token')
        // console.log("TOKEN::", token);
        

        if( !token ){
            return Response.json({
                data: {},
                message: "No current user",
                success: false
            },{
                status: 401
            })
        }
        const decodedToken = jwt.verify(token.value, process.env.JWT_KEY!)

        if(!decodedToken){
            return Response.json({
                data: {},
                message: "Invalid token",
                success: false
            },{
                status: 401
            })
        }

        // console.log("DECODED TOKEN::", decodedToken?._doc);
        return Response.json({
            data: decodedToken,
            message: "Token decoded",
            success: true
        },{
            status: 200
        })
        
    } catch (error:any) {
        throw new Error(error)
    }
}