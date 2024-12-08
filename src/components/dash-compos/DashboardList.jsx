"use client";
import Link from "../../../node_modules/next/link";
import axios from "../../../node_modules/axios/index";
import { useState, useEffect } from "react";
import NetworkError from "../conditions/NetworkError";
import Spinner from "../conditions/Spinner";
import EmptyData from "../conditions/EmptyData";

const DashboardList = () => {
  const [data, setData] = useState(false)
  const [isError, setError] = useState(false)

  async function getData() {
      try {
        const response = await axios.get('/api/productList');
        setData(response.data.data);
      } catch (error) {
        setError(error.response.data.message);
      };
  };

  useEffect(()=> {
    getData();
  }, [])


  if(data.length===0) return <EmptyData />

  if(isError) return <NetworkError networkError={isError} />
  
  return(
    <div className="flex justify-center items-center w-full min-h-screen" >
        {
          data?
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-20 gap-7 items-center w-fit h-fit py-[100px]" >
              {
                data.map((productSort=>(
                  <Link href={`/dashboard/productList/${productSort.sort}`} key={productSort.sort} className="flex justify-center items-center w-[230px] h-[60px] bg-white rounded-md text-black">
                    <p>{(productSort.sort.replace(/-/g, " "))}</p>
                  </Link>
                )))
              }
          </div>: <Spinner />
        }
    </div>
  );
};

export default DashboardList;