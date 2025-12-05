import connectDB from "@/utils/connectDB";
import { Order } from "@/model/order.model";

export async function POST(request: Request){
    await connectDB()

    try {
        const {country} = await request.json()
    
        const orders = await Order.find({country: country, isplaced: true})
    
        if(!orders){
            return Response.json(
                {
                    data: {},
                    message: "order not found",
                    success: false
                },
                {
                    status: 400
                }
            )
        }
    
        return Response.json(
            {
                data: orders,
                message: "order fetched successfully",
                success: true
            },
            {
                status: 200
            }
        )
    } catch (error:any) {
        console.log("Error creating order", error);
        throw new Error(error);
    }
}