import React from 'react'
import Title from '../components/title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const Contact = () => {
  return (
    <div>

     <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}/>
     </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
         <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
          <p className='text-gray-500'>GANDHIBHAI CENTER <br /> DVN COLLEGE ROAD ANAKAPALLE</p>
          <p className='text-gray-500'>TEL:(+91) 9121995358 <br /> EMAIL: RAJU4262@GMAIL.COM</p>
          <p className='font-semibold text-xl text-gray-600'>CAREERS AT FOREVER</p>
          <p className='text-gray-500'>LEARN MORE ABOUT OUR TEAMS AND JOB OPENINGS.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS</button>
        

         </div>
      </div>
      <Newsletterbox/>
    </div>
  )
}

export default Contact