import mongoose from "npm:mongoose@7.6.3"; 
import { Dinner } from "../types.ts";



const Schema = mongoose.Schema; 

const DinnerSchema = new Schema({
    name:{type:String,unique:true},
    CIF:{type:String,unique:true},
    address:{type:String, required:true},
    booking:[{type:Schema.Types.ObjectId,required:true,ref:"Booking"}],
})



DinnerSchema.
path("CIF").validate((CIF:string)=>{
    try{
    const expr = /^[A-Z]{1}[0-9]{8}/
    if (!CIF.match(expr)) {
        return false;
    } else {
        return true;
    }
}catch(e){
    console.log("El CIF no es correcto"); 
    return false;
}
})
export type DinnerModelType = mongoose.Document & Omit<Dinner, "booking"> & {
    booking: Array<mongoose.Types.ObjectId>;
}
export const DinnerModel = mongoose.model<DinnerModelType>("Dinner", DinnerSchema);