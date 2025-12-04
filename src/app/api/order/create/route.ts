import connectDB from "@/utils/connectDB";
import { Order } from "@/model/order.model";

export async function POST(request: Request){
    await connectDB()

    try {
        const {country} = await request.json()
    
        const order = await Order.create({items:[], country})
    
        if(!order){
            return Response.json(
                {
                    data: {},
                    message: "order not created",
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
                message: "order created successfully",
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