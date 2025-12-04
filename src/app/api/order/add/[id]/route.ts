import connectDB from "@/utils/connectDB";
import { FoodItem } from "@/model/foodItem.model";
import { Order } from "@/model/order.model";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
){
    await connectDB()
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id.split('=')
        const orderId = id[0];
        const itemId = id[1]
    
        const order = await Order.findById(orderId)
    
        if(!order){
            return Response.json(
                {
                    data: {},
                    message: "Order Not Found",
                    success: false
                },
                {
                    status: 400
                }
            )
        }
    
        const foodItem = await FoodItem.findById(itemId)
    
        if(!foodItem){
            return Response.json(
                {
                    data: {},
                    message: "Food item Not Found",
                    success: false
                },
                {
                    status: 400
                }
            )
        }
    
        order.items.push(foodItem._id)
    
        await order.save()
    
        return Response.json(
            {
                data: order,
                message: "Food item added successfully",
                success: true
            },
            {
                status: 200
            }
        )
    } catch (error:any) {
        console.log("Error adding food item to order", error);
        throw new Error(error);
    }
}