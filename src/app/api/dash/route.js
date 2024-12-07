import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";

export async function GET() {
    try {
        await connectDB();

        const data = await DashboardModel.find();
        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
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
            return new Response(JSON.stringify({ message: "All fields are required." }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        if(!quantity) quantity=1

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
        return new Response(JSON.stringify({ message: "Product added successfully" }), 
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
};


export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectDB(); // Connect to your database

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to delete product" }), {
      status: 500,
    });
  }
}

