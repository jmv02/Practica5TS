
import { Request, Response } from "npm:express@4.18.2";
import { DinnerModel } from "../db/Dinner.ts";
import { getDinnerFromModel } from "../controllers/getDinnerFromModel.ts";




export const getDinnerId = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    try {
        const dinner = await DinnerModel.findById(id).exec();

        if (!dinner) {
            res.status(400).send("No se encontro el restaurante");
            return;
        }
        const dinnerFromModel = await getDinnerFromModel(dinner);

        res.status(201).send(dinnerFromModel);
    } catch (e) {
        res.status(500).send(e.message);
    }


}