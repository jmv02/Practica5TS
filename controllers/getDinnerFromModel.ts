
import { DinnerModelType } from "../db/Dinner.ts";
import { BookingModel } from "../db/Booking.ts";
import { Dinner } from "../types.ts";



export const getDinnerFromModel = async (dinner: DinnerModelType): Promise<Dinner> => {
    const {name,CIF,address } = dinner;

    const reservas = await BookingModel.find({ dinner_id: { $in: dinner.booking } }).populate("dinner_id");


    if (!reservas) throw new Error("El cliente no tiene ninguna reserva");


    return {
        name:name,
        CIF:CIF,
        address:address,
        booking: reservas,

    }
}