"use client";
import { useEffect, useState } from 'react';
import axios from '../../../../../node_modules/axios/index';
import Spinner from '@/components/conditions/Spinner';
import ProductSample from '@/components/samples/ProductSample';
import NetworkError from '@/components/conditions/NetworkError';
import EmptyData from '@/components/conditions/EmptyData';

const page = ({ params }) => {

  const [data, setData] = useState(false);
  const [isError, setError] = useState(false);

  async function getData() {
    try {
      const response = await axios.post('/api/sorts', { sortProduct: params.sorts });
      setData(response.data.data);
    } catch (error) {
      setError(error.response.data.message);
    };
  };

  useEffect(()=> {
    getData();
  }, []);

  if(data.length===0) return <EmptyData />

  if(isError) return <NetworkError NetworkError={isError} />

  return (
    <div className="flex justify-center items-center w-full min-h-screen" >
      {
        data?
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit py-[60px]">
          {
            data.map(product => <ProductSample key={product._id} productData={product} />)
          }
        </div>
        :<Spinner/>
      }
    </div>
  );
};

export default page;