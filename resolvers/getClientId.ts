
import {Request,Response} from "npm:express@4.18.2"; 
import { ClientModel } from "../db/Client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";


export const getClientId = async(req:Request<{id:string}>,res:Response) => {
const id = req.params.id; 
try{
    const client = await ClientModel.findById(id).exec(); 

    if(!client){
    res.status(400).send("No se encontro el cliente"); 
    return;
    }
    const clientFromModel = await getClientFromModel(client);

    res.status(201).send(clientFromModel);
}catch(e){
    res.status(500).send(e.message); 
}


}