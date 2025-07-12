import mongoose  from "mongoose";
const Categoryschema=new mongoose.Schema({
categoryName:{
    type:String
}
},{timestamps:true})
export const Category=mongoose.model("category",Categoryschema);