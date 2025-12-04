import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface foodItemInterface{
    name: string,
    price: number,
    country: string
}

const foodItemSchema:Schema<foodItemInterface> = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
        enum: ["INDIA", "AMERICA"],
        required: true
    }
})

export const FoodItem = mongoose.models.FoodItem as mongoose.Model<foodItemInterface> || mongoose.model<foodItemInterface>("FoodItem", foodItemSchema)
