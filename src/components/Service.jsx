import React from 'react'
import img1 from '../img/table.png'
import img2 from '../img/dinner.png'
import img3 from '../img/delivery-icon.png'
import * as md from "react-icons/md";
const Service = () => {
  return (
    <div className=' h-full'>
    <div className='flex'>
        <div className='w-8 h-20 bg-orange-600'></div>
        <h1 className='ml-6 text-4xl font-sans font-bold'>Our Services</h1>
        <p className='ml-24 text-lg font-sans mr-40'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum distinctio nobis exercitationem mollitia quidem possimus, aspernatur optio ratione amet odio in totam eli.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptatem ipsam voluptatibus aliquid corrupti quia ad repellat nihil officia iure, architecto distinctio ullam fugiat aperiam dolorem. Fugit eius nesciunt tempora!</p>
    </div>
    <div className='flex mt-11'>
      <div className='flex flex-col w-1/4'>
        <div>
        {/* <md.MdDining className='text-orange-500 text-4xl'/> */}
          <img src={img1} alt="" />
        </div>
         <div>
          <h1 className='text-orange-500 text-3xl font-sans font-medium '>Food for Free</h1>
        </div>
      </div>
      <div className='flex flex-col w-1/4'>
       <div>
       <h1 className='text-orange-500 text-3xl font-sans font-medium '>Food for Free</h1>
      
        </div>
        <div>
          <img src={img2} alt="" />
        </div>
      </div>
      <div className='flex flex-col w-2/5'>
       
        <div>
          <img src={img3} alt="" />
        </div>
        <div>
       <h1 className='text-orange-500 text-3xl font-sans font-medium '>Food for Free</h1>
      
        </div>
      </div>
    </div>
    </div>
  )
}

export default Service