import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";

export async function POST(req,res) {
  
  try {
      const { sortProduct } = await req.json();
      await connectDB();

      const data = await DashboardModel.find({ sort: sortProduct });
      return new Response(JSON.stringify({ data }), {
          status: 200,
          headers: { 
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
          },
      });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  };
};


export async function GET () {
    try {
        await connectDB();
  
        const data = await DashboardModel.find({}, 'sort image');

        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    };
};