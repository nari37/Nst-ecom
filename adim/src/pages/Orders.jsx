// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'


// const Orders = ({ token }) => {
//   const [orders, setorders] = useState([])

  
//   const fetchallorders = async () => {

//     if (!token) {
//         console.error("Token is not available");
//         return;
//     }
//     try {
//         const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
//         if (response.data.success) {
            
//             setorders(response.data.orders);
//         } else {
//             toast.error(response.data.message || "Failed to fetch orders");
//         }
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         toast.error(error.message);
//     }
// };


//   useEffect(() => {
//     fetchallorders()
//   }, [token])

//   return (
//     <div>
//       <h3>orders page</h3>
//       <div>
//         {
//         orders.map((order, index) => {
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
//               <img src={assets.parcel_icon} alt="" />
//               <div>
//                 <div>
//                   {order.item.map((item, index) => {
//                     if (index === order.items.length - 1) {
//                       return <p key={index}>{item.name} * {item.quantity} <span>{item.size}</span> </p>
//                     }
//                     else {
//                       return <p key={index}>{item.name} * {item.quantity} <span>{item.size},</span> </p>

//                     }
//                   })}
//                 </div>
//                 <p>{order.address.first + "" + order.address.lastname}</p>
//                 <div>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + "," + order.address.country + "," + order.address.zipcode}</p>

//                 </div>
//                 <p>{order.address.phone}</p>
//               </div>
//               <div>
//                 <p>items:{order.items.length}</p>
//                 <p>method:{order.paymentmethod}</p>
//                 <p>payment:{order.payment ? 'done' : 'pending'}</p>
//                 <p>date:{new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p>{currency}{orders.amount}</p>
//               <select>
//                 <option value="order placed">order placed</option>
//                 <option value="packing">packing</option>
//                 <option value="shipped">shipped</option>
//                 <option value="out for delivery">out for delivery</option>
//                 <option value="deliverd">deliverd</option>
//               </select>
//             </div>
//           })
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse() || []); // Ensure orders is always an array
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message);
      setOrders([]); // Ensure orders is an empty array in case of error
    }
  };

  const statusHandler = async ( event, orderid ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderid, status:event.target.value}, {headers:{token}})
        if (response.data.success){
              await fetchAllOrders()
        }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} * {item.quantity} <span>{item.size}</span>
                    </p>
                  ))}
                </div>
                <p>
                  {order.address.firstname} {order.address.lastname}
                </p>
                <div>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.country},{' '}
                    {order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentmethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[-15x]'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="order placed">Order Placed</option>
                <option value="packing">Packing</option>
                <option value="shipped">Shipped</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
