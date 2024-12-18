import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";
import { NextResponse } from "../../../../node_modules/next/server";

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