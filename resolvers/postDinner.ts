
import { Request, Response } from "npm:express@4.18.2"; 
import { DinnerModel } from "../db/Dinner.ts";
import { getDinnerFromModel } from "../controllers/getDinnerFromModel.ts";


export const postDinner = async(req:Request,res:Response) => {
  
    try{
    const { name, CIF, address } = req.body; 
    if(!name ||!CIF ||!address ){
        res.status(400).send("Faltan campos"); 
    }

    
    const existe = await DinnerModel.findOne({CIF}).exec(); 

    if(existe){
        res.status(400).send("Ya existe ese restaurante"); 
        return;
    }

    const dinner = new DinnerModel({ name, CIF, address }); 
    await dinner.save(); 
    const DinnerFromModel = await getDinnerFromModel(dinner); 
    res.status(201).send(DinnerFromModel); 
    }catch(e){
        res.status(500).send(e.message)
    }
}