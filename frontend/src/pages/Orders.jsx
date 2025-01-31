import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from '../components/title';
import axios from 'axios';

const Orders = () => {

  const {backendurl,token, currency,   userid,} = useContext(Shopcontext);

  const [orderdata,setorderdata] = useState([])



console.log(orderdata,'data.......')

  const loadorderdata = async () =>{
    try {
      if(!token){
        return null

      }

      const response = await axios.post(backendurl + '/api/order/userorders',{userid},{headers:{token}})
      console.log(response.data)
         if(response.data.success){
          let allordersitem = []
          response.data.orders.map((Order)=>{
            Order.items.map((item)=>{
              item['status'] = Order.status
              item['payment'] = Order.payment
              item['paymentmethod'] = Order.paymentmethod
              item['date'] = Order.date
              allordersitem.push(item)
             })
          })
          setorderdata(allordersitem.reverse())
         }
    
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadorderdata()
  },
[token])

  return (
    <div className='border-t pt-16'>
        <div className='text-2xl'>
               <Title text1={'MY '} text2={'ORDERS'}/>
        </div>
        <div>
          {
            orderdata.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
            <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
            <div>
              <p className='sm:text-base font-medium'>{item.name}</p>
              <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
               <p>{currency}{item.price}</p>
               <p>QUANTITY: {item.quantity}</p>
               <p>SIZE: {item.size}</p>
              </div>
              <p className='mt-2'>DATE: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              <p className='mt-2'>payment: <span className='text-gray-400'></span>{item.paymentmethod}</p>

          
            </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                 <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item .status}</p>
            </div>
            <button onClick={loadorderdata} className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
            </div>
            </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders
