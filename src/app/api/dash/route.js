import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";
import { NextResponse } from "../../../../node_modules/next/server";
import sharp from "sharp";

export async function GET() {
    try {
        await connectDB();

        const data = await DashboardModel.find();
        return NextResponse.json({ data }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    };
};


export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        // Parse the incoming request body
        const body = await request.json();
        
        // Validate the required fields
        let { name, image, price, offer, sort, quantity } = body;
        if (!name || !image || !price || !sort) {
            return NextResponse.json({ message: "All fields are required." }, {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        if(!quantity) quantity=1

        // const imageBuffer = Buffer.from(image, "base64");
        // const optimizedImageBuffer = await sharp(imageBuffer)
        //   .webp({ quality: 45 }) // Convert to WebP with 75% quality
        //   .toBuffer();

         


        // Create a new document in MongoDB
        await DashboardModel.create({
            name,
            image,
            price,
            offer,
            sort,
            quantity
        });

        // Return a success response
        return NextResponse.json({ message: "Product added successfully" }, 
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
};


export async function DELETE({ params }) {
  const { id } = params;

  try {
    await connectDB(); // Connect to your database

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, {
        status: 404,
      });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete product" }, {
      status: 500,
    });
  }
}

