"use client"
import { useState } from 'react';
import Link from 'next/link';
import axios from '../../../node_modules/axios/index';
import PostSuccess from '../conditions/PostSuccess';
import Spinner from '../conditions/Spinner';

const AddProduct = () => {

  const [imageUrl, setImage] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataResponse, setResponse] = useState(null)
  const [data, setData] = useState({
    image: '',
    name: '',
    sort: 'Hot Coffee',
    price: '',
    offer: '',
    quantity: ''
  })

  const eventHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    if(name === 'image') {
      if(!event.target.files[0]) return;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload= () => {
        setImage(reader.result)
      }
    }
    
    setData(data => ({...data,[name]: value}))
  }


  const onSubmitHandler = async (formData) => {
    if(!formData.get('name') || !formData.get('price') || !imageUrl) {
      alert('Make Sure All Fields Are Not Empty');
      return
    }

    setIsLoading(true)

    var reader = new FileReader();
    reader.readAsDataURL(formData.get('image'))
    setIsLoading(true)

    reader.onload = async () => {
      const imageReader= reader.result.split(",")[1]
      try {
        const response = await axios.post('/api/dash',{
          image: String(reader.result),
          name: String(formData.get('name')),
          sort: String(formData.get('sort')),
          price: Number(formData.get('price')),
          offer: Number(formData.get('offer')),
          quantity: Number(formData.get('quantity'))
        })
        setSuccess(true)
        setResponse(response.data.message)
      } catch (error) {
        setSuccess(false)
        setResponse(error.response.message)
      };
    };
  };

  return (
    <div className="bg-white z-40 absolute flex justify-center items-center text-black w-full h-screen">
      <div className="z-50 absolute sm:top-[10px] sm:left-[20px] top-0 left-0 w-full sm:w-[200px] h-[30px] flex justify-around items-center font-sans">
        <Link href="/" className="p-2">Home</Link>
        <Link href="/dashboard" className="p-2">Dashboard</Link>
      </div>
      {
        success? <PostSuccess response={dataResponse} />:
        isLoading? <Spinner />:
        <form action={onSubmitHandler} className="w-[400px] h-screen font-sans">
        <ul className="flex flex-col justify-evenly items-center w-full h-full">
          <li className="flex flex-col">
            <label htmlFor='image' className='cursor-pointer font-sans flex justify-center items-center flex-col p-3 bg-gray-50 rounded-md border-dashed border-gray-400 border-[2px] hover:bg-gray-100 shadow-md'>
              {
                imageUrl? <img src={imageUrl} className="w-[190] h-fit" alt='no lgo' />:
                <>
                  <svg className="w-16 h-16 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="text-[13px] text-gray-400" >click to upload a picture</p>
                </>
              }
              <input onChange={eventHandler} value={data.image} id="image" type="file" accept='image/*' name="image" className="hidden" placeholder='Product Name'/>
            </label>
          </li>
          <li className="flex flex-col items-center w-[80%]">
            <label htmlFor='name' className='cursor-pointer pb-3 font-sans font-semibold'>Product Name</label>
            <input onChange={eventHandler} value={data.name} id="name" type="name" name="name" className='w-[260px] h-[37px] border-[2px] cursor-pointer border-black rounded-md shadow-md focus:outline-none focus:border-green-500 text-center' placeholder='Product Name'/>
          </li>
          <li className="flex justify-evenly items-center w-[80%]">
            <div className="flex flex-col">
              <label htmlFor='sort' className='cursor-pointer pb-3 font-sans font-semibold'>Sort Product</label>
              <select onChange={eventHandler} value={data.sort} id="sort" name='sort' className="w-[155px] h-[30px] border-[2px] border-black rounded-md focus:outline-none text-gray-500 text-center">
                <option value='Hot-Coffee' >Hot Coffee</option>
                <option value='Ice-Coffee'>Ice Coffee</option>
                <option value='Latte-Flavor'>Latte Flavor</option>
                <option value='Frappuccino'>Frappuccino</option>
                <option value='Frappe'>Frappe</option>
                <option value='Milk-Shake'>Milk Shake</option>
                <option value='Smoothie'>Smoothie</option>
                <option value='Energy-Drink'>Energy Drink</option>
                <option value='Soda-Drinks'>Soda Drinks</option>
                <option value='Iced-Drinks'>Iced Drinks</option>
                <option value='Hot-Drinks'>Hot Drinks</option>
                <option value='Pan-Cake'>Pan Cake</option>
                <option value='Waffle'>Waffle</option>
                <option value='Dessert'>Dessert</option>
                <option value='Extra-Dessert'>Extra Dessert</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor='price' className='cursor-pointer pb-3 font-sans font-semibold'>Price</label>
              <input onChange={eventHandler} value={data.price} type='number' name='price' id='price' placeholder='00.0' className="w-[80px] h-[30px] border-[2px] border-black rounded-md focus:outline-none text-center" />
            </div>
          </li>
          <li className="flex justify-evenly items-center w-[80%]">
            <div className="flex flex-col" >
              <label htmlFor='offer' className='cursor-pointer pb-3 font-sans font-semibold'>Offer</label>
              <input onChange={eventHandler} value={data.offer} id="offer" type="number" name="offer" className='w-[100px] h-[30px] border-[2px] cursor-pointer border-black rounded-md shadow-md focus:outline-none focus:border-green-500 text-center' placeholder='00.0'/>
            </div>
            <div className="flex flex-col" >
              <label htmlFor='quantity' className='cursor-pointer pb-3 font-sans font-semibold'>Quantity</label>
              <input onChange={eventHandler} value={data.quantity} id="quantity" type="number" name="quantity" className='w-[135px] h-[30px] border-[2px] cursor-pointer border-black rounded-md shadow-md focus:outline-none focus:border-green-500 text-center' placeholder='1'/>
            </div>
          </li>
          <li>
            <button className="bg-gray-300 px-4 py-1 rounded-md">Submit</button>
          </li>
        </ul>
      </form>
      }
    </div>
  );
};

export default AddProduct;