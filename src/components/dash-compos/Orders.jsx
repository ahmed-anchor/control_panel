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
  const [refresh, setRef] = useState(0);

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
      setData(false);
      setRef(prev=>++prev);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(()=>{
    getOrdersData();
  }, [refresh])

  if(isError) return <NetworkError networkError={isError} />

  if(data.length===0) return <EmptyData />

  return (
    <div className="flex flex-col justify-around items-center text-black w-full min-h-screen pt-[71px]">
    {
      data?
        
      data.map(order=>(
        <div key={order._id} className="w-full h-fit flex flex-col justify-center items-center pb-[80px]">
          <OrderSample products={order.order} />
          <a href={`${order.location}`} target="_blank" className="my-[10px] px-[10px] bg-slate-500">location</a>
          <button onClick={()=>deleteOrder(order._id)} className="bg-red-300 px-[10px]">Delete</button>
        </div>
      ))
      
      : <Spinner />
    }
    </div>

  )
}
export default Orders;