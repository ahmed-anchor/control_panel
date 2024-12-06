"use client";
import { useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import NetworkError from "../conditions/NetworkError";
import Spinner from "../conditions/Spinner";
import EmptyData from "../conditions/EmptyData";
import OrderSample from "../samples/OrderSample";

const Orders = () => {
  const [isError, setError] = useState('');
  const [data, setData] = useState(false);

  async function getOrdersData() {
    try{
      const ordersData = await axios.get('/api/bucket');
      setData(ordersData.data.data)
    }catch(error) {
      setError(error.response.data.message)
    };
  };

  async function deleteOrder (_id) {
    try {
      const response = await axios.delete('/api/bucket', { data: {_id} })
      alert(response.data.message)
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(()=>{
    getOrdersData();
  }, [])

  if(isError) return <NetworkError networkError={isError} />

  if(data.length===0) return <EmptyData />

  return (
    <div className="flex justify-center items-center text-black w-full min-h-screen">
    {
      data?
        
      data.map(order=>(
        <div key={order._id} className="w-full h-fit flex flex-col justify-center items-center">
          <OrderSample products={order.order} />
          <a href={`${order.location}`} target="_blank">location</a>
          <button onClick={()=>deleteOrder(order._id)}>Delete</button>
        </div>
      ))
      
      : <Spinner />
    }
    </div>

  )
}
export default Orders;