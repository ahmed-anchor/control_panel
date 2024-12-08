import connectDB from "../../../../config/database";
import DashboardModel from "../../../../models/dashboardModel";
import { NextResponse } from "../../../../node_modules/next/server";

export async function GET () {
  try {
      await connectDB();

      const data = await DashboardModel.aggregate([
        {
          $group: {
            _id: "$sort", // Group by the 'sort' field
          },
        },
        {
          $project: {
            sort: "$_id", // Rename '_id' to 'sort'
          },
        },
      ]);

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