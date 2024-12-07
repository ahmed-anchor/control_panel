import DashboardModel from "../../../../models/dashboardModel";
import connectDB from "../../../../config/database";

export async function POST(req,res) {
  
  try {
      const { productIds } = await req.json();
      await connectDB();

      const data = await DashboardModel.find({ _id: { $in: productIds } });
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

export async function DELETE (req) {
    await connectDB();
    const { _id } = await req.json();
  
    try {
      const deletedProduct = await DashboardModel.findByIdAndDelete(_id);
      if (!deletedProduct) {
        return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error deleting product' }), { status: 500 });
    }
  }