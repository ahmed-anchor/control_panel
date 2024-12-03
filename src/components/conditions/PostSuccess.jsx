"use client";

const PostSuccess = ({ response }) => {
  return (
    <div className="w-full h-full absolute z-40 flex justify-center items-center">
        <div className="flex flex-col justify-evenly rounded-md items-center bg-white shadow-sm w-[200px] h-96" >
        <svg viewBox="0 0 448 512">
          <path fill="#63E6BE" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>    
          <h1 className="text-[20px] font-sourGummy text-black capitalize text-center py-[20px]">{response}</h1>
        </div>
    </div>
  );
};

export default PostSuccess;