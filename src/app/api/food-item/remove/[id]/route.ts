import mongoose from "mongoose";
import { FoodItem } from "@/model/foodItem.model";
import connectDB from "@/utils/connectDB";

export async function DELETE(
  request: Request, 
  context: any,
  { params }: { params: { id: string }, }
){
    await connectDB()
    const id = params?.id
    try {
        console.log("CONTEXT", context);
        
        console.log("ID:", id);
        
        const existingFoodItem = await FoodItem.findByIdAndDelete(id)

        if(!existingFoodItem){
            return Response.json(
                {
                    data: {},
                    message:"Food item not deleted",
                    success: false
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
                {
                    data: existingFoodItem,
                    message:"Food item created successfully",
                    success: true
                },
                {
                    status: 200
                }
            )

    } catch (error) {
        
    }
}