import connectDB from "../../../../config/database";
import DashboardModel from "../../../../models/dashboardModel";


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

      return new Response(JSON.stringify({ data }), {
          status: 200,
          headers: { 
              'Content-Type': 'application/json',
          },
      });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};