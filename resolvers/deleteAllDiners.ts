import {Request,Response} from "npm:express@4.18.2"
import { DinnerModel } from "../db/Dinner.ts";

export const deleteAllDiner = async(req:Request,res:Response) => {
    try{
        await DinnerModel.deleteMany({}).exec(); 
        if(res.status(200)){
        res.send("Se han borrado todos los restaurantes correctamente");
        }
    }catch(e){
        res.status(400).send(e.message);
    }
    
}

