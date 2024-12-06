"use client"
import axios from "../../../node_modules/axios/index";
import { useState, useEffect } from "react";
import NetworkError from "@/components/conditions/NetworkError";
import EmptyData from "@/components/conditions/EmptyData";
import Spinner from "@/components/conditions/Spinner";
import ClientSample from "@/components/samples/BucketSample";

const page = () => {

  const [data, setData] = useState(false);
  const [isError, setError] = useState();
  const [refCount, setRefCount] = useState(0);
  const [order, setOrder] = useState([]);
  const [urlLocation, setLocationUrl] = useState('')

  async function postOrder() {
    try {
      
      const orderData = {
        order: order,
        location: urlLocation
      }
      const response = await axios.post('/api/bucket', {orderData})
      alert(response.data.message)
      sessionStorage.setItem('bucket', '[]')
      setRefCount(prev=>++prev);
    } catch(error) {
      alert(error.response.data.message);
      setRefCount(prev=>++prev);
    };
  };

  async function removeFromBucket (removedProduct) {
    const bucketData = await JSON.parse(sessionStorage.getItem('bucket'));
    const newBucketData = await bucketData.filter(bucketId=>bucketId.id!==removedProduct);
    sessionStorage.setItem('bucket', JSON.stringify(newBucketData));
    setRefCount(prev=>++prev);
  };

  async function getBucketData() {
    if(sessionStorage.getItem('bucket')) {
      const bucketData = await JSON.parse(sessionStorage.getItem('bucket'))
      if(bucketData.length===0) {
        setData([])
        return
      }
      console.log(bucketData)
      const ids = bucketData.map(data=>(data.id))
      try {
        const response = await axios.post('/api/productId', { productIds: ids });
        let edited = [];
        let form = [];
        for (let i = 0; i < response.data.data.length; i++) {
          edited.push({...response.data.data[i], quantity: bucketData[i].quantity});
          form.push({
            id: response.data.data[i]._id,
            quantity: bucketData[i].quantity
          })
        }
        setOrder(form)
        setData(edited);
        console.log(edited)
      } catch (error) {
        setError(error.response.data.message);
      };
      return
    }
    setData([])
  };

  useEffect(()=>{
    getBucketData();
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocationUrl(`https://www.google.com/maps/search/?api=1&query=${position.coords.latitude}%2C${position.coords.longitude}`)
        }
      );
    }
  }, [refCount])

  if(data.length===0) return <EmptyData />

  if(isError) return <NetworkError networkError={isError} />

  return (
    <div className="flex justify-center items-center min-h-screen w-full" >

      {
        data?
        <>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit py-[60px]" >
          {
            data.map(productData => <ClientSample key={productData._id} productData={productData} deleteProduct={removeFromBucket} />)
          }
        </div>
        <button onClick={postOrder} className="text-black absolute bottom-2 translate-[50%]">Buy Product</button>
        </>
        : <Spinner />
      }
    </div>
  )
};

export default page;