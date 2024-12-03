"use client";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [options, setOptions] = useState(false);

  return (
    <nav className="z-50 fixed flex flex-col w-screen bg-white shadow-md px-6 py-3 mt-10x">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
            <Link onClick={()=> setOptions(false)} href="/" className="mr-4 text-[26px] block cursor-pointer text-slate-800 font-semibold">
                Caff<span className='text-red-500'>ee</span>
            </Link>
            <div className="flex justify-between">
                <ul className="sm:flex mt-0 mb-0 flex-row hidden sm:gap-6">
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link  href="/dashboard" className="flex items-center">
                            Admin
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link href="/" className="flex items-center">
                            Products
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link href="/about" className="flex items-center">
                            About Us
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link  href="/security" className="flex items-center">
                            Security Terms
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='w-16 sm:pe-7 sm:w-fit flex flex-row justify-between items-center'>
                <Link href="/bucket" type="button" className=" w-6 h-2 pointer flex justify-center items-center">
                    <svg viewBox="0 0 576 512">
                        <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                    </svg>
                </Link>
                <button onClick={()=> setOptions(prev=>!prev)} type="button" className="w-6 h-2 sm:hidden pointer flex justify-center p-0.5 items-center">
                    <svg viewBox="0 0 448 512">
                        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                    </svg>
                </button>
            </div>
        </div>
        { options && 
            <div className='w-full h-fit sm:hidden pt-6'>
                <ul className="flex mt-0 mb-0 flex-col gap-1">
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600 pointer">
                        <Link onClick={()=> setOptions(false)} href="/dashboard" className="flex items-center w-full py-2 hover:bg-red-500 hover:text-white font-semibold ps-2 transition duration-200 rounded-md">
                            Admin
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link onClick={()=> setOptions(false)} href="/" className="flex items-center w-full py-2 hover:bg-red-500 hover:text-white font-semibold ps-2 transition duration-200 rounded-md">
                            Products
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link onClick={()=> setOptions(false)} href="/about" className="flex items-center w-full py-2 hover:bg-red-500 hover:text-white font-semibold ps-2 transition duration-200 rounded-md">
                            About Us
                        </Link>
                    </li>
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <Link onClick={()=> setOptions(false)} href="/security" className="flex items-center w-full py-2 hover:bg-red-500 hover:text-white font-semibold ps-2 transition duration-200 rounded-md">
                            Security Terms
                        </Link>
                    </li>
                </ul>
            </div>
        }
    </nav>
  );
};

export default Navbar;