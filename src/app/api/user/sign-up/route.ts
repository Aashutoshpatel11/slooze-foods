import bcrypt from "bcryptjs";
import { User } from "@/model/user.model";
import connectDB from "@/utils/connectDB";

export async function POST(request: Request) {
    await connectDB()
    try {
        const {fullname, email, password, country, role} = await request.json()

        console.log(fullname, email, password, country, role);
        
    
        if( !fullname || !email || !password || !country ){
            return Response.json(
            {
                data: {},
                message: "ALl details are required",
                success: false
            },
            {
                status: 401
            }
            )
        }
        console.log("COUNTRY:", country=="INDIA");
        
        if( country != "INDIA" && country != "AMERICA" ){
            return Response.json(
            {
                data: {},
                message: "Invalid country selected",
                success: false
            },
            {
                status: 401
            }
        )
        }
    
        if( role != "ADMIN" && role != "MANAGER" && role != "MEMBER"){
            return Response.json(
            {
                data: {},
                message: "Invalid role selected",
                success: false
            },
            {
                status: 402
            }
            )
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({ fullname, email, password: hashedPassword ,country, role })
    
        const savedUser = await newUser.save()
    
        return Response.json(
            {
                data: savedUser,
                message: "User registeres successfully",
                success: true
            },
            {
                status: 200
            }
        )
    } catch (error:any) {
        console.log("Error registering user::", error);
        throw new Error(error);
    }

}