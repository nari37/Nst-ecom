import React from 'react'

const Newsletterbox = () => {
    const onSubmitHandler = (event) =>{
     event.preventDefault()
    }
  return (
    <div className=' text-center'>
       <p className='text-2xl font-medium text-gray-800'>SUBSCRIBE NOW & GET 20% OFF</p>
   <p className='text-gray-400'>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ipsam expedita non quidem reiciendis officiis atque in nisi? Consequatur reprehenderit veniam molestiae maxime nobis ab quaerat quibusdam fugit tenetur non!
   </p>
   <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
    <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
  <button type='SUBMIT' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
   </form>
    </div>
  )
}

export default Newsletterbox