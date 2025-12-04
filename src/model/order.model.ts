import { Document, Schema } from "mongoose";
import mongoose from "mongoose";
import { FoodItem } from "./foodItem.model";

export interface orderInterface extends Document {
    items: []
    country: string
}

const orderSchema:Schema<orderInterface> = new Schema({
    items: [
        {
            foodItem: Schema.Types.ObjectId,
            ref: 'FoodItem'
        }
    ],
    country:{
        type: String,
        enum: ["INDIA", "AMERICA"]
    }
})

export const Order = mongoose.models.Order as mongoose.Model<orderInterface> || mongoose.model<orderInterface>('Order', orderSchema)