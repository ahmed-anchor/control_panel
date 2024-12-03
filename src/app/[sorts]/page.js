"use client";
import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import Spinner from '@/components/conditions/Spinner';
import ClientProduct from '@/components/samples/ClientProduct';
import NetworkError from '@/components/conditions/NetworkError';

const page = ({ params }) => {

  const [data, setData] = useState(false);
  const [isError, setError] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0)

  async function getData() {
    try {
      const response = await axios.post('/api/sorts', { sortProduct: params.sorts });
      setData(response.data.data);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(()=> {
        setRefreshCount(prev=>++prev);
      }, 5000);
    };
  };

  useEffect(()=> {
    getData();
  }, [refreshCount]);

  if(isError) return <NetworkError networkError={isError} />

  return (
    <div className="w-full min-h-screen flex justify-center items-center pt-[100px]" >
        {
          data?
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit" >
            {
              data.map(product => <ClientProduct key={product._id} productData={product} />)
            }
          </div>
          : <Spinner/>
        }
    </div>
  );
};

export default page;