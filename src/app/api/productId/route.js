import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";
import { NextResponse } from "../../../../node_modules/next/server";

export async function POST(req) {
  
  try {
      const { productIds } = await req.json();
      await connectDB();

      const data = await DashboardModel.find({ _id: { $in: productIds } });
      return NextResponse.json({ data }, {
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

export async function DELETE (req) {
    await connectDB();
    const { _id } = await req.json();
  
    try {
      const deletedProduct = await DashboardModel.findByIdAndDelete(_id);
      if (!deletedProduct) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
  }