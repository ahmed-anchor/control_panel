"use client";
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import Spinner from '@/components/conditions/Spinner';
import ClientProduct from '@/components/samples/ClientProduct';
import NetworkError from '@/components/conditions/NetworkError';
import EmptyData from '@/components/conditions/EmptyData';

const page = ({ params }) => {

  const [data, setData] = useState(false);
  const [isError, setError] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0)

  async function getData() {
    try {
      const response = await axios.get(`/api/sorts/${params.sorts.toString()}`, 
      // {
      //   headers: {
      //     'Cache-Control': 'private, max-age=20'
      //   }
      // }
    );
      setData(response.data.data);
      console.log(response.data.data)
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

  if(data.length===0) return <EmptyData />

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