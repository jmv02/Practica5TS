import mongoose from "npm:mongoose@7.6.3"; 
import { Booking } from "../types.ts";
import { ClientModel } from "./Client.ts";
import { DinnerModel } from "./Dinner.ts";

const Schema = mongoose.Schema; 

const BookingSchema = new Schema({
    date:{type:String, required:false, default:"23/21/23",},
    client_id:{type:mongoose.Types.ObjectId,required:true},
    dinner_id:{type:mongoose.Types.ObjectId, required:true}, 
    },
    { timestamps: true },
);


BookingSchema.
    path("client_id").validate(async (client_id:mongoose.Types.ObjectId) => {
        try{
            if(!mongoose.isValidObjectId(client_id)) return false; 
            const client = await ClientModel.findById(client_id); 

            if(!client){
            console.log("No se encuentra el cliente");
            return false;
        }else{ 
            return true;
            }

        } catch (e) {
            return false;
        }
    });
BookingSchema.
path("dinner_id").validate(async(dinner_id:mongoose.Types.ObjectId) => {
    try {
        if (!mongoose.isValidObjectId(dinner_id)) return false;
        const dinner = await DinnerModel.findById(dinner_id);

        if (!dinner) {
            console.log("No se encuentra el restaurante");
            return false;
        } else {
            return true;
        }

    } catch (e) {
        return false;
    }
});

/*BookingSchema.pre("save",async function(next){
    const booking = new BookingModel; 
    try{
        await mongoose.model("Client").findByIdAndUpdate({id:booking.client_id},{$push:
            {date:booking.date,dinner_id:booking.dinner_id}}); 
        
    }catch(e){
        console.log("Hubo un problema actualizando el cliente"); 
       throw new Error(e); 
    }
    next();
});*/

export type BookingModelType = mongoose.Document & Omit<Booking,"client_id" | "dinner_id"> & {
    client_id: mongoose.Types.ObjectId;
    dinner_id: mongoose.Types.ObjectId;
};

export const BookingModel = mongoose.model<BookingModelType>("Booking",BookingSchema);

