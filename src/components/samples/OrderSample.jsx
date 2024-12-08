"use client";
import axios from "../../../node_modules/axios/index";
import { useEffect, useState } from "react";
import EmptyData from "../conditions/EmptyData";
import NetworkError from "../conditions/NetworkError";
import Spinner from "../conditions/Spinner";

const OrderSample = ({products}) => {
  const [data, setData] = useState(false);
  const [isError, setError] = useState('');

  async function getOrdersData () {
    let ids = []
    products.map(order=>ids.push(order.id))
    try{
      const response = await axios.post('/api/productId', {productIds: ids});
      let edited = []
      for (let i = 0; i < response.data.data.length; i++) {
        edited.push({...response.data.data[i], quantity: products[i].quantity});
      }
      setData(edited);
    }catch(error) {
      setError(error.response.message);
    }
  };

  

  useEffect(()=>{
    getOrdersData();
  }, [])

  if(data.length===0) return <EmptyData />

  if(isError) return <NetworkError networkError={isError} />

  return(
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit pb-[20px]">
      {
        data?
        data.map(productData=>(
          <div key={productData._id} style={{ backgroundImage: `url(${productData.image})` }} className="shadow-[0, 0, 10px, 10px] w-[290px] text-white h-[105px] rounded-md bg-center bg-cover">
          <div className={`bg-[rgba(0,0,5,0.3)] w-full h-full backdrop-blur-[1px] rounded-md`} >
            <p className="absolute top-1 left-1 font-semibold text-[18px] capitalize font-mono">{productData.name}</p>
              <p className="absolute left-1 bottom-1 text-[22px] font-semibold">{productData.price}$</p>
              {
                productData.offer?
                <p className="absolute right-1 bottom-1 text-red-500 font-semibold text-[16px] line-through">{productData.offer}$</p>
                :""
              }
              {
                productData.quantity?
                <p className="absolute right-[50%] bottom-7 text-green-500 font-semibold text-[26px]" >
                {productData.quantity}
                </p>:""
              }
          </div>
        </div>
        ))
      :<Spinner />
      }
    </div>
  )

};

export default OrderSample;