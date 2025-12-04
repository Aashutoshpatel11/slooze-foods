import mongoose from "mongoose";

type connectionObject = {
    isConnected?: Number
}

const connection: connectionObject = {};

const connectDB = async () => {

    if(connection.isConnected){
        console.log("Database is already connected");
        return
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`||"")

        if(db){
            connection.isConnected = db.connections[0].readyState
            console.log("Database is connected");
        }

    } catch (error) {
        console.log("Error Connecting database::", error);
        process.exit()
    }
} 

export default connectDB;