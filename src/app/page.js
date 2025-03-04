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
    fetch('/api/sorts', {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache, must-revalidate, proxy-revalidate',
        'Expires': '0',
      },
      cache: 'no-cache'
    })
    .then(res=>res.json())
    .then(response=>setData(response.data))
    .catch(error=>setError(error.message))
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
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit pt-[100px]" >
            {
              data.map(productSort=>(
                <Link key={productSort._id}
                href={`/${productSort.sort}`} 
                style={{backgroundImage: `url(${productSort.image})`}}
                className="bg-cover rounded-md bg-no-repeat bg-center w-[280px] h-[100px]"
                >
                <div className="bg-[rgba(0,0,5,0.2)] relative flex justify-around items-center w-100 h-[100%] backdrop-blur-[1px] rounded-md" >
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