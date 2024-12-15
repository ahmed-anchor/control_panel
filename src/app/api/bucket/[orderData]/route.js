import connectDB from "../../../../../config/database";
import OrderModel from "../../../../../models/orderModel";
import { NextResponse } from "../../../../../node_modules/next/server";

export async function GET(req,{ params }) {
  
  try {
      await connectDB();
      const {orderData} = params
      
      if(!orderData.location) {
        return NextResponse.json({ message: 'sorry you have so allow detecting your location' }, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      };

      await OrderModel.create(orderData);
      
      return NextResponse.json({ message: 'ordered successfully' }, {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=100'
          },
      });
  } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};