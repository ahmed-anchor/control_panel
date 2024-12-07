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
  
        const data = await DashboardModel.aggregate([
            {
              $sort: { _id: 1 }, // Sort by any field to decide which product to consider first
            },
            {
              $group: {
                _id: "$sort", // Group by the 'sort' field
                firstProduct: { $first: "$$ROOT" }, // Take the first document in each group
              },
            },
            {
              $replaceRoot: { newRoot: "$firstProduct" }, // Flatten the result to show only the product
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