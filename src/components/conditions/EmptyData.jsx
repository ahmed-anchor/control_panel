"use client";

const EmptyData = () => {

  return(
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col w-fit h-fit font-medium text-black justify-between items-center text-center" >
        <svg className='w-[40px]' viewBox="0 0 384 512">
          <path fill="#000000" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/>
        </svg>
        <p className="py-[10px]">No Such Data Here</p>
      </div>
    </div>
  );
};

export default EmptyData;