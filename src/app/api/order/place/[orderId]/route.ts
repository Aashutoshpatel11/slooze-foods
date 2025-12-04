import { Order } from "@/model/order.model";
import { FoodItem } from "@/model/foodItem.model";
import mongoose from "mongoose"; 
import connectDB from "@/utils/connectDB";

export async function POST(request: Request,{params}: {params:{orderId: string}}) {
    await connectDB()
    
    try {
        const resolvedParams = await params
        const orderId = resolvedParams.orderId

        const {paymentMethod} = await request.json()

        const order = await Order.findByIdAndUpdate(orderId, {isplaced: true, paymentMethod: paymentMethod})

        if( !order ){
            return Response.json(
                {
                    data: {},
                    message: "order not placed",
                    success: false
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
            {
                data: order,
                message: "order placed successfully",
                success: true
            },
            {
                status: 200
            }
        )

    } catch (error:any) {
        console.log("Error placing order::", error);
        throw new Error(error)
    }
}