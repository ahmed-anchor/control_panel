import OrderModel from "../../../../models/orderModel";
import connectDB from "../../../../config/database";
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req) {
  
  try {
      await connectDB();
      const { orderData } = await req.json();
      
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
          },
      });
  } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};


export async function GET () {
  try {
    await connectDB();
    const data = await OrderModel.find();
    return NextResponse.json({ data }, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch(error) {
    return NextResponse.json({ message: 'Internal server Error'}, {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}

export async function DELETE (req) {
  await connectDB();
  const { _id } = await req.json();

  try {
    const deletedProduct = await OrderModel.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting Order' }, { status: 500 });
  }
}