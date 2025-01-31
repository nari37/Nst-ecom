import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
     <div>
        <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
        <p className='font-semibold'>EASY EXCHANGE POLICY</p>
        <p className='text-gray-400'>WE OFFER HASSLE FREE EXCHANGE POLICY</p>
     </div>
     <div>
        <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
        <p className='font-semibold'>7DAYS RETURN POLICY</p>
        <p className='text-gray-400'>WE PROVIDE 7 DAYS FREE RETURN POLICY</p>
     </div>
     <div>
        <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
        <p className='font-semibold'>BEST CUSTOMER SUPPORT POLICY</p>
        <p className='text-gray-400'>WE PROVIDE 24/7 CUSTMOR SUPPORT POLICY</p>
     </div>
    </div>
  )
}

export default Ourpolicy