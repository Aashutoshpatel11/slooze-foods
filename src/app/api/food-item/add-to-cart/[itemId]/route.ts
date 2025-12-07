import mongoose from "mongoose";
import connectDB from "@/utils/connectDB";
import { FoodItem } from "@/model/foodItem.model";
import { User } from "@/model/user.model";

export async function POST(request: Request, { params }: { params: Promise<{ itemId: string }> }){
    await connectDB()
    try {
        const {itemId} = await params
        const {userId} = await request.json()

        const foodItem = await FoodItem.findById(itemId)

        if(!foodItem){
            throw new Error("Food Item not found")
        }

        const user = await User.findById(userId)

        if(!user){
            throw new Error("User not found")
        }

        const itemExists = user.cart.find( (item) => item.equals(foodItem._id))

        if(itemExists){
            return Response.json({
                data: user,
                message: "Item already exist in Card",
                success: false
            },{
                status: 403
            })
        }

        user.cart.push(foodItem._id)

        const savedUser = await user.save()

        return Response.json({
            data: savedUser,
            message: "Item added to Card",
            success: true
        },{
            status: 200
        })


    } catch (error:any) {
        throw new Error(error)
    }
}