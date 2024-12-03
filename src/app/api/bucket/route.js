import OrderModel from "../../../../models/orderModel";
import connectDB from "../../../../config/database";

export async function POST(req,res) {
  
  try {
      await connectDB();
      const { orderData } = await req.json();
      
      if(!orderData.location) {
        return new Response(JSON.stringify({ message: 'sorry you have so allow detecting your location' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'force-cache'
          },
        });
      };

      

      await OrderModel.create(orderData);
      
      return new Response(JSON.stringify({ message: 'ordered successfully' }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'force-cache'
          },
      });
  } catch (error) {
      console.error('Error while requesting data:', error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};


export async function GET () {
  try {
    await connectDB();
    const data = await OrderModel.find();
    console.log(data)
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', "Cache-Control": "no-store" }
    })
  } catch(error) {
    return new Response(JSON.stringify({ message: 'Internal server Error'}), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}