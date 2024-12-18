import { NextResponse } from "../../../../../node_modules/next/server";
import connectDB from "../../../../../config/database";
import DashboardModel from "../../../../../models/dashboardModel";



export async function GET(req, { params }) {
  try {
        await connectDB();
      const {sort} = params;
      const data = await DashboardModel.find({ sort: sort });
      return NextResponse.json({ data }, {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Surrogate-Control': 'no-store'
            },
      });
  } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};


