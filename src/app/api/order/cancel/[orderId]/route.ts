import { Order } from "@/model/order.model";
import connectDB from "@/utils/connectDB";

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  console.log("DELETING ORDER...");
  await connectDB();

  try {
    const resolvedParams = await params;
    const {orderId} = resolvedParams
    console.log("Order ID:", orderId);

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return Response.json(
        {
          message: "Order not deleted or not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        data: order,
        message: "Order deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error Deleting Order:", error.message);
    throw new Error(error)
  }
}
