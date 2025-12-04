import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

export interface userInterface extends Document{
    fullname: string,
    email: string,
    password: string,
    role: string,
    country: string,
    token: String
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
    }
    
})  

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema)