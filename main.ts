import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { Request, Response } from "npm:express@4.18.2"; 
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { postClient } from "./resolvers/postClient.ts";
import { postDinner } from "./resolvers/postDinner.ts";
import { postBooking } from "./resolvers/postBooking.ts";
import { getClientId } from "./resolvers/getClientId.ts";
import { getDinnerId } from "./resolvers/getDinnerId.ts";
import { getBookingId } from "./resolvers/getBookingId.ts";
import { deleteDinnerId } from "./resolvers/deleteDinnerId.ts";
//import { getClientID } from "./resolvers/getClientId.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL || MONGO_URL === undefined) {
  console.log("No mongo URL found");

} else {

await mongoose.connect(MONGO_URL);
  const app = express();
  app.use(express.json());

  app.get("/test",(req:Request,res:Response)=>{
    res.status(200).send("Working!");
  } )
  

app.post("/client",postClient); 
app.post("/restaurant",postDinner); 
app.post("/booking",postBooking); 

app.get("/client/:id",getClientId); 
app.get("/restaurant/:id",getDinnerId); 
app.get("/booking/:id",getBookingId);

app.delete("/restaurant/:id",deleteDinnerId);


  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}


