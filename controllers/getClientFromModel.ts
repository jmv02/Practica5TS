import { ClientModel, ClientModelType } from "../db/Client.ts";
import { BookingModel, BookingModelType } from "../db/Booking.ts";
import { Client } from "../types.ts";



export const getClientFromModel = async(client:ClientModelType):Promise<Client> => {
    const {firstName,lastName,email,phone,dni} = client; 
   const reservas = await BookingModel.find({ client_id: { $in: client.booking } }).populate("client_id");


    if(!reservas) throw new Error ("El cliente no tiene ninguna reserva"); 


    return {
      firstName:firstName,
      lastName:lastName,
      email:email,
      phone:phone,
      dni:dni,
      booking:reservas,
   
    }


}