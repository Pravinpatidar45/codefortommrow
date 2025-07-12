import mongoose  from "mongoose";
const Adminschema=new mongoose.Schema({
Email:{
    type:String
},
Password:{
    type:String
}
},{timestamps:true})
export const Admin=mongoose.model("admin",Adminschema);