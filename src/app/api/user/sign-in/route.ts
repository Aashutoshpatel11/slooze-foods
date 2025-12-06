import { User } from "@/model/user.model";
import connectDB from "@/utils/connectDB";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request:Request){
    const cookieStore = await cookies()
    await connectDB()
    try {
        const {email, password, country} = await request.json()

        if(!email || !password){
            return Response.json(
            {
                data: {},
                message: "ALl details are required",
                success: false
            },
            {status: 400}
            )
        }

        const existingUser = await User.findOne({email, country}).select('-password')

        if(!existingUser){
            return Response.json(
            {
                data: {},
                message: "User not found! Please sign-up",
                success: false
            },
            {status: 400}
            )
        }

        const isPasswordCorrect = bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect){
            return Response.json(
            {
                data: {},
                message: "Incorrect Password",
                success: false
            },
            {status: 400}
            )
        }

        const token = jwt.sign({...existingUser}, process.env.JWT_KEY!, {expiresIn: '1h' } )

        cookieStore.set('token', token, {httpOnly:true, secure: true} )

        return Response.json(
            {
                data: existingUser,
                message: "User logged in successfully",
                success: true
            },
            {status: 200}
        )

    } catch (error:any) {
        console.log("Error logging-in user::", error);
        throw new Error(error);
    }
}