import { ClientModel } from "../db/Client.ts";
import { DinnerModel } from "../db/Dinner.ts";
import { BookingModelType } from "../db/Booking.ts";
import { Booking } from "../types.ts";



export const getBookingsFromModel = async(booking:BookingModelType):Promise<Booking> => {
    const {_id,date,client_id,dinner_id} = booking;

    const client = await ClientModel.findById(client_id); //Aqui no uso populate porque no estoy buscando en otras colecciones
    if(!client) throw new Error("No se ha encontrado el cliente asignado a la reserva"); 

    const dinner = await DinnerModel.findById(dinner_id);
    if (!dinner) throw new Error("No se ha encontrado el restaurante asignado a la reserva");

    return{
        date,
        client_id:client._id.toString(),
        dinner_id:dinner._id.toString(),
     
    };
};