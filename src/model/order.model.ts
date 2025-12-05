import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { FoodItem } from "./foodItem.model";

export interface orderInterface extends Document {
    items: Types.ObjectId[],
    country: string,
    isplaced: boolean,
    paymentMethod: string
}

const orderSchema:Schema<orderInterface> = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref:"FoodItem"
        }
    ],
    country:{
        type: String,
        enum: ["INDIA", "AMERICA"]
    },
    isplaced: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "DEBIT", "CREDIT", "UPI"],
        default: "COD"
    }

})

export const Order = mongoose.models.Order as mongoose.Model<orderInterface> || mongoose.model<orderInterface>('Order', orderSchema)