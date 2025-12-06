import { Order } from "@/model/order.model"
import mongoose from "mongoose"
import connectDB from "@/utils/connectDB"

export async function PATCH(request: Request, { params }: { params: Promise<{ orderId: string }> }){
    await connectDB()
    try {
        const {orderId} = await params
        const {paymentMethod} = await request.json()

        const order = await Order.findByIdAndUpdate(orderId, {paymentMethod: paymentMethod})

        if(!order){
            return Response.json(
                {
                    data: {},
                    message: "Payment method Not updated successfully",
                    success: false
                },{
                    status: 400
                }
            )
        }

        return Response.json(
            {
                data: order,
                message: "Payment method updated successfully",
                success: true
            },{
                status: 200
            }
        )

    } catch (error:any) {
        console.log("Error updating order::", error);
        throw new Error(error);
    }
}