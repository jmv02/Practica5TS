import {Request,Response} from "npm:express@4.18.2";
import { getDinnerFromModel } from "../controllers/getDinnerFromModel.ts";
import { DinnerModel } from "../db/Dinner.ts";

export const deleteDinnerId = async(req:Request<{id:string}>,res:Response) => {
const id = req.params.id; 
const dinner = await DinnerModel.findByIdAndDelete(id).exec(); 
if(!dinner){
    res.status(400).send("No se encontro el restaurante"); 
    return;
}else if(res.status(200)){
    res.send("Se ha borrado el restaurante correctamente");  
}

}