import mongoose from "mongoose";
import { User } from "@/model/user.model";
import connectDB from "@/utils/connectDB";

export async function GET(request:Request,  {params}: {params: {userId: string}} ){
    await connectDB()
    try {
        const resolvedParams = await params
        const {userId} = resolvedParams

        const user = await User.findById(userId).select('-paasword -token').populate('cart')
        if(!user){
            return Response.json({
                data: {},
                message: "User not found",
                success: false
            },{
                status: 403
            })
        }

        return Response.json({
            data: user,
            message: "Cart items fetched successfully",
            success: true
        },{
            status: 200
        })
    } catch (error:any) {
        console.log("ERROR GET CART ITEMS::", error);
        throw new Error(error)
    }
}