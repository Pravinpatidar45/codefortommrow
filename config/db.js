import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbconnect=(req,res,next)=>{
try {
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{
        console.log(error)
    })
} catch (error) {
    return res.status(402).json({messge:"database not Conneted",error:error.messge})
}
}