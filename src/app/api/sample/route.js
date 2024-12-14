import { NextResponse } from "../../../../node_modules/next/server";
import connectDB from "../../../../config/database";
import DashboardModel from "../../../../models/dashboardModel";


export async function POST(req) {
  try {
      const { sortProduct } = await req.json();
      await connectDB();
      console.log(sortProduct)
      const data = await DashboardModel.find({ sort: sortProduct });
      return NextResponse.json({ data }, {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'private, max-age=120'
          },
      });
  } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};