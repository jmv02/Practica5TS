import mongoose from "npm:mongoose@7.6.3"; 
import { Client } from "../types.ts";


const Schema = mongoose.Schema; 

const ClientSchema = new Schema ({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:Number, required:false,unique:true},
    dni:{type:String,required:true, unique:true},
    booking:[{type:Schema.Types.ObjectId, required:true, ref:"Booking"},],
    }
); 

ClientSchema.
path("email").validate((email:string) =>{
 try{
     const expr = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,4}$/;  
  if(!email.match(expr)){
    return false;
  }else{
    return true;
  }
}catch(e){
    console.log("El email no concuerda con un email normal");
    return false; 
}
});

ClientSchema.
    path("phone").validate((phone: number) => {

        try{
        const strphone = phone.toString(); 

        if(strphone.length < 9){
            return false; 
        }else{
            return true; 
        }

        }catch(e){
            console.log("Eso no es un numero de telefono"); 
            return false; 
        }
    });


ClientSchema.
    path("dni").validate((dni:string)=>{
        try{
            const expr = /^[0-9]{8}[a-zA-Z]{1}$/
            if (!dni.match(expr)) {
                return false;
            } else {
                return true;
            }
            
        }catch(e){
            console.log("El dni no concuerda con un dni normal"); 
            return false;
        }
    })


export type ClientModelType = mongoose.Document & Omit<Client, "booking">  &{
    booking:Array<mongoose.Types.ObjectId>; 
}
export const ClientModel = mongoose.model<ClientModelType>("Client", ClientSchema);  

