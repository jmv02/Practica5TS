
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/Booking.ts";
import { getBookingsFromModel } from "../controllers/getBookingsFromModel.ts";
import { DinnerModel } from "../db/Dinner.ts";
import { ClientModel } from "../db/Client.ts";


export const getBookingId = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    try {
        const booking = await BookingModel.findById(id).exec();

        if (!booking) {
            res.status(400).send("No se encontro el bookinge");
            return;
        }
        const bookingFromModel = await getBookingsFromModel(booking);
        const diner = await DinnerModel.findById(booking.dinner_id);
        const client = await ClientModel.findById(booking.client_id);
        if(!diner ||!client){
            res.status(400).send("No se encontro el restaurante o cliente");
            return;
        }
        const dinerName = diner.name;
        const clientfirstName = client.firstName;
        const clientlastName = client.lastName;
        
        res.status(201).send({
            bookingFromModel,
            dinerName,
            clientfirstName,
            clientlastName,
       
        });
    } catch (e) {
        res.status(500).send(e.message);
    }


}