"use client"
import { useState, useEffect } from 'react';
import axios from '../../node_modules/axios/index';
import NetworkError from '@/components/conditions/NetworkError';
import EmptyData from '@/components/conditions/EmptyData';
import Spinner from '@/components/conditions/Spinner';
import Link from '../../node_modules/next/link';

const Home = () => {

  const [data,setData] = useState(false);
  const [isError, setError] = useState(false);
  
  async function fetchData () {
    try {
      const response = await axios.get('/api/sorts');
      setData(response.data.data);
    } catch (error) {
      setError(error.response.data.message);
    };
  };

  useEffect(()=> {
    fetchData();
  }, []);

  if(data.length===0) return <EmptyData />

  if(isError) return <NetworkError networkError={isError} />

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {
        data?
        (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit py-[60px]" >
            {
              data.map(productSort=>(
                <Link key={productSort._id} style={{ backgroundImage: `url(${productSort.image})` }} href={`/${productSort.sort}`} className=" w-[290px] h-[90px] rounded-md bg-center bg-cover">
                  <div className="bg-[rgba(0,0,5,0.2)] flex justify-around items-center w-full h-full backdrop-blur-[1px] rounded-md" >
                  <p className="text-white font-semibold text-[20px]">{productSort.sort.replace(/-/g," ")}</p>
                  </div>
                </Link>
              ))
            }
          </div>
        )
        :<Spinner />
      }
    </div>
  );
};

export default Home;
