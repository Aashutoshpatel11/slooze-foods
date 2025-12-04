import mongoose from "mongoose";
import { FoodItem } from "@/model/foodItem.model";
import connectDB from "@/utils/connectDB";

export async function POST(request: Request) {
    await connectDB()
    try {
        const {name, price, country} = await request.json()

        if(!name || !price ||!country){
            return Response.json(
                {
                    data: {},
                    message:"Please provide all details",
                    success: false
                },
                {
                    status: 400
                }
            )
        }

        const existingFoodItem = await FoodItem.findOne({
            name, country
        })

        console.log(existingFoodItem);
        

        if(existingFoodItem){
            return Response.json(
                {
                    data: {},
                    message:"Food item already exists",
                    status: false
                },
                {
                    status: 400
                }
            )
        }

        const newFoodItem = await FoodItem.create({name, price, country})

        if(!newFoodItem){
            return Response.json(
                {
                    data: {},
                    message:"food item not created in database! Please try again",
                    success: false
                },
                {
                    status: 204
                }
            )
        }

        return Response.json(
                {
                    data: newFoodItem,
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