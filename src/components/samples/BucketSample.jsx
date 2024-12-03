"use client"

const ClientSample = ({productData, deleteProduct}) => {

  return(
    <div style={{ backgroundImage: `url(${productData.image})` }} className="shadow-[0, 0, 10px, 10px] w-[290px] h-[105px] rounded-md bg-center bg-cover">
      <div className={`bg-[rgba(0,0,5,0.3)] w-full h-full backdrop-blur-[1px] rounded-md`} >
        <p className="absolute top-1 left-1 text-white font-semibold text-[18px] capitalize font-mono">{productData.name.replace(/-/g," ")}</p>
        <button onClick={()=>deleteProduct(productData._id)} className="absolute right-1 flex justify-center items-center h-full w-[60px] rounded-md " >
          <svg className="w-9" viewBox="0 0 448 512">
            <path fill="#f94d4d" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </button>
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
  );
};

export default ClientSample;