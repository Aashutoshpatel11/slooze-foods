import { FoodItem } from "@/model/foodItem.model";
import connectDB from "@/utils/connectDB";


export async function POST(request: Request){
    await connectDB()
    try {
        const {country} = await request.json()

        const foodItems = await FoodItem.find( {country} )

        if(!foodItems){
            return Response.json(
                {
                    data: {},
                    message:"No food item found",
                    success: false
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
            {
                data: foodItems,
                message:"Data fetched successfully",
                success: true
            },
            {
                status: 200
            }
        )

    } catch (error: any) {
        console.log("Error fetching food items", error);
        throw new Error(error);
    }
}