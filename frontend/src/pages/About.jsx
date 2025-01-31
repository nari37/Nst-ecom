import React from 'react'
// import Title from '../components/title'

import Title from '../components/Title.jsx';
import { assets } from '../assets/frontend_assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const about = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT '} text2={'US'}/>

        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis nobis libero deleniti placeat ullam dolorem! Quaerat vero odio ex. Dolorem suscipit facilis ducimus rem voluptatem ipsum iusto quam, aspernatur hic.</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit perspiciatis maxime commodi quos cumque est et dignissimos explicabo in distinctio! Aspernatur voluptate, culpa quia ex ab vero voluptatum fuga eligendi?</p>
             <b className='text-gray-800'>OUR MISSION</b>
             <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo perspiciatis sunt nemo. Delectus quaerat exercitationem minus pariatur animi saepe neque doloribus quos beatae in iure natus, accusantium eos facilis officiis.</p>
           </div>
        </div>
        <div className='text-4xl py-4'>
          <Title text1={'why'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>QUALITY ASSURANCE:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel atque voluptatem, dolores itaque quis ratione necessitatibus doloremque dignissimos iure culpa architecto ab sed temporibus, nisi incidunt distinctio, commodi voluptate.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>CONVENCIENCE:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel atque voluptatem, dolores itaque quis ratione necessitatibus doloremque dignissimos iure culpa architecto ab sed temporibus, nisi incidunt distinctio, commodi voluptate.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>EXCEPTIONAL CUSTOMER SERVICE</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel atque voluptatem, dolores itaque quis ratione necessitatibus doloremque dignissimos iure culpa architecto ab sed temporibus, nisi incidunt distinctio, commodi voluptate.</p>
           </div>
        </div>

        <Newsletterbox/>
    </div>
  )
}

export default about