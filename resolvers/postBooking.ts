import mongoose from "npm:mongoose@8.0.1";
import express from "npm:express@4.18.2";
import { Request, Response } from "npm:express@4.18.2"; 
import { BookingModel } from "../db/Booking.ts";
import { getBookingsFromModel } from "../controllers/getBookingsFromModel.ts";

export const postBooking = async(req:Request,res:Response) => {
    const {date,client_id,dinner_id} = req.body; 

try{
   if(!date ||!client_id ||!dinner_id){
        res.status(400).send("Faltan campos");
        return;
    }
    
        const booking = new BookingModel({ date, client_id, dinner_id }); 
        await booking.save(); 

        const BookingFromModel = getBookingsFromModel(booking); 
        res.status(201).send(BookingFromModel)


    }catch(e){
        res.status(500).send(e.message); 
    }

}