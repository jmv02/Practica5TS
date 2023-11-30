import mongoose from "npm:mongoose@8.0.1"; 
import express from "npm:express@4.18.2"; 
import { Request, Response } from "npm:express@4.18.2"; 
import { ClientModel } from "../db/Client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";


export const postClient = async(req:Request,res:Response) => {
try{

    const { firstName, lastName, email, phone, dni } = req.body; 
    
    if (!firstName || !lastName ||!email || !phone ||!dni){
        res.status(400).send("Faltan campos");    
        return; 
    }

    const client = new ClientModel({ firstName, lastName, email, phone, dni }); 
    await client.save(); 

    const clientFromModel = await getClientFromModel(client);

    res.status(201).send(clientFromModel);

    
}catch(e){
    res.status(500).send(e.message); 
}


}
