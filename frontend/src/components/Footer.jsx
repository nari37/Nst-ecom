import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    <div>
        <img src={assets.logo} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et voluptas ducimus dicta totam dolor nisi magnam maiores exercitationem incidunt id libero minus facere voluptates, qui quidem enim necessitatibus dolorem veritatis.
        </p>
    </div>
    <div>
        <p className='text-xl font-medium mb-5'> COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
           <li>HOME</li>
           <li> ABOUT US</li>
           <li> DELIVERY</li>
           <li>PRIVACY POLICY</li>
        </ul>
    </div>
    <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+9121995358</li>
            <li>nareshpogiri409@gmail.com</li>

        </ul>
    </div>
    </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>@copyright 2024 forever.com - all right reserved.</p>
    </div>
    </div>
  )
}

export default Footer