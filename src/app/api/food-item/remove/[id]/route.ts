import mongoose from "mongoose";
import { FoodItem } from "@/model/foodItem.model";
import connectDB from "@/utils/connectDB";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string }, }
){
    await connectDB()
    const resolvedParams = await params;
    const id = resolvedParams.id;
    try {
        
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
                    message:"Food item deleted successfully",
                    success: true
                },
                {
                    status: 200
                }
            )

    } catch (error) {
        
    }
}