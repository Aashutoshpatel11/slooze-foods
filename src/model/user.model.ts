import { Document, ObjectId, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import { FoodItem } from "./foodItem.model";

export interface userInterface extends Document{
    fullname: string,
    email: string,
    password: string,
    role: string,
    country: string,
    token: String,
    cart: Types.ObjectId[]
}

const userSchema:Schema<userInterface> = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enum: ["INDIA", "AMERICA"]
    },
    role: {
        type: String,
        enum: ["ADMIN", "MANAGER", "MEMBER"],
        default: "Member"
    },
    token: {
        type: String,
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FoodItem'
        }
    ]
    
})  

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema)