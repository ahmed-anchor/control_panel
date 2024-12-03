"use client";
import { useState } from "react";

const ClientProduct = ({ productData }) => {

  const [animation, setAnimation] = useState('')

  async function setSessionStorage () {
    setAnimation('pick-product')
    setTimeout(()=>{
      setAnimation('')
    }, 330)

    const bucketData = sessionStorage.getItem('bucket');
    if (bucketData) {
      // Parse the existing bucket data
      const bucketProducts = JSON.parse(bucketData);
      // Consolidate items by ID
      const consolidatedItems = Object.values(
        bucketProducts.reduce((acc, item) => {
          if (acc[item.id]) {
            // If the ID exists, increment the quantity
            acc[item.id].quantity += item.quantity;
          } else {
            // Otherwise, add the new item
            acc[item.id] = { ...item };
          }
          return acc;
        }, {})
      );
      // Add or update the current product
      const productIndex = consolidatedItems.findIndex(item => item.id === productData._id);
      if (productIndex !== -1) {
        // If the product exists, increment the quantity
        consolidatedItems[productIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the list
        consolidatedItems.push({ id: productData._id, quantity: 1 });
      }
      // Update session storage with the consolidated items
      sessionStorage.setItem('bucket', JSON.stringify(consolidatedItems));
    } else {
      // If 'bucket' doesn't exist, initialize it with the current product
      const initialItem = [
        {
          id: productData._id,
          quantity: 1,
        },
      ];
      sessionStorage.setItem('bucket', JSON.stringify(initialItem));
    }
  }

  return (
    <div key={productData._id} style={{ backgroundImage: `url(${productData.image})` }} className="shadow-[0, 0, 10px, 10px] w-[290px] h-[105px] rounded-md bg-center bg-cover">
      <div className={`${animation? animation : `bg-[rgba(0,0,5,0.3)]`} w-full h-full backdrop-blur-[1px] rounded-md`} >
        <p className="absolute top-1 left-1 text-white font-semibold text-[18px] capitalize font-mono">{productData.name.replace(/-/g," ")}</p>
        <button onClick={setSessionStorage} className="absolute right-1 flex justify-center items-center h-full w-[60px] rounded-md " >
          <svg className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
          <p className="absolute left-1 bottom-1 text-[22px] font-semibold">{productData.price}$</p>
          {
            productData.offer?
            <p className="absolute right-1 bottom-1 text-red-500 font-semibold text-[16px] line-through">{productData.offer}$</p>
            :""
          }
      </div>
    </div>
  );
};

export default ClientProduct;