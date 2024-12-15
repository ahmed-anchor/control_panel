import { NextResponse } from "../../../../../node_modules/next/server";
import connectDB from "../../../../../config/database";
import DashboardModel from "../../../../../models/dashboardModel";

export async function GET(req,{params}) {
  
  try {
    await connectDB();
    const { productIds } = params;

    

      const data = await DashboardModel.find({ _id: { $in: productIds } });
      return NextResponse.json({ data }, {
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