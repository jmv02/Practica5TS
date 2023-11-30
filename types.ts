import mongoose from"npm:mongoose@8.0.1"
export type Client = {
  firstName:string; 
  lastName:string; 
  email:string; 
  phone:number;
  dni:string; 
  booking:Array<Booking>

}


export type Dinner = {
  name:string; 
  CIF:string; 
  address:string; 
  booking:Array<Omit<Booking,"dinner_id">>; 
}

export type Booking = {
  date:string; 
  client_id:mongoose.Types.ObjectId; 
  dinner_id:mongoose.Types.ObjectId; 
}

