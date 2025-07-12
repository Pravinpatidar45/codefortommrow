import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({
    CategoryID: {
        type: String
    },
    services: [{
        ServiceName: {
            type: String
        }
        ,
        Type: {
            type: String
        },
        price: [{
            ServiceID: {
                type: String
            },
            Duration: {
                type: String
            },
            Price: { type: Number },
            Type: {
                type: String
            }
        }]
    }]

}, { timestamps: true });
export const Service = mongoose.model("service", ServiceSchema)