
import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Title from '../components/title';
import { assets } from '../assets/frontend_assets/assets';
import Carttotal from '../components/Carttotal';

function Cart() {
  const { products, currency, cartitems, updatequantity, navigate } = useContext(Shopcontext);
  const [cartdata, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item],
            });
          }
        }
      }
      setCartData(tempdata);
    }
  }, [cartitems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {
        cartdata.map((Item, index) => {
          // Find the corresponding product data
          const productdata = products.find((product) => product._id === Item._id);

          if (!productdata) {
            return null; // Skip rendering if productdata is not found
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productdata.image[0]} alt="" />
                <div>

                  <p className="text-xs sm:text-lg font-medium">{productdata.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productdata.price}</p>
                  <p className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1}>
                     {Item.size}
                  </p>
                </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value === '' || e.target === '0' ? null : updatequantity(Item._id, Item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={Item.quantity} />
              <img onClick={() => updatequantity(Item._id, Item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <Carttotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/Placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;

// ................




// import React, { useContext, useEffect, useState } from 'react';
// import { Shopcontext } from '../context/Shopcontext';
// import Title from '../components/title';
// import { assets } from '../assets/frontend_assets/assets';
// import Carttotal from '../components/Carttotal';


// function Cart() {
//   const { products, currency, cartitems, updatequantity, navigate } = useContext(Shopcontext);
//   const [cartdata, setCartData] = useState([]);

//   const syncCartData = () => {
//     if (products.length > 0) {
//       const tempdata = [];
//       for (const items in cartitems) {
//         for (const item in cartitems[items]) {
//           if (cartitems[items][item] > 0) {
//             tempdata.push({
//               _id: items,
//               size: item,
//               quantity: cartitems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempdata);
//     }
//   };

//   useEffect(() => {
//     syncCartData(); // Sync cart data on component mount or whenever cartitems change
//   }, [cartitems, products]);

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1="YOUR" text2="CART" />
//       </div>
//       <div>
//         {cartdata.map((Item, index) => {
//           const productdata = products.find((product) => product._id === Item._id);

//           if (!productdata) {
//             return null; // Skip rendering if the product data is not found
//           }

//           return (
//             <div
//               key={index}
//               className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//             >
//               <div className="flex items-start gap-6">
//                 <img className="w-16 sm:w-20" src={productdata.image[0]} alt={productdata.name} />
//                 <div>
//                   <p className="text-xs sm:text-lg font-medium">{productdata.name}</p>
//                   <div className="flex items-center gap-5 mt-2">
//                     <p>{currency}{productdata.price}</p>
//                     <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">
//                       {Item.size}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <input
//                 onChange={(e) =>
//                   e.target.value === '' || e.target.value === '0'
//                     ? null
//                     : updatequantity(Item._id, Item.size, Number(e.target.value))
//                 }
//                 className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                 type="number"
//                 min={1}
//                 defaultValue={Item.quantity}
//               />
//               <img
//                 onClick={() => {
//                   updatequantity(Item._id, Item.size, 0); // Remove item from context
//                 }}
//                 className="w-4 mr-4 sm:w-5 cursor-pointer"
//                 src={assets.bin_icon}
//                 alt="Delete"
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <Carttotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate('/Placeorder')}
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;


// ............ currect one


// import React, { useContext, useEffect, useState } from 'react';
// import { Shopcontext } from '../context/Shopcontext';
// import Title from '../components/title';
// import { assets } from '../assets/frontend_assets/assets';
// import Carttotal from '../components/Carttotal';

// function Cart() {
//   const { products, currency, cartitems, updatequantity, navigate } = useContext(Shopcontext);
//   const [cartdata, setCartData] = useState([]);

//   const syncCartData = () => {
//     if (products.length > 0) {
//       const tempdata = [];
//       for (const items in cartitems) {
//         for (const item in cartitems[items]) {
//           if (cartitems[items][item] > 0) {
//             tempdata.push({
//               _id: items,
//               size: item,
//               quantity: cartitems[items][item],
//             });
//           }
//         }
//       }
//       setCartData(tempdata);
//     }
//   };

//   useEffect(() => {
//     syncCartData(); 
//   }, [cartitems, products]);

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1="YOUR" text2="CART" />
//       </div>
//       {cartdata.length === 0 ? ( // Check if cartdata is empty
//         <div className="text-center py-10">
//           <p className="text-lg text-gray-500">Your cart is empty.</p>
//           <button
//             onClick={() => navigate('/collection')} // Redirect to shop or homepage
//             className="mt-5 px-6 py-2 bg-black text-white text-sm rounded"
//           >
//             Go to Shop
//           </button>
//         </div>
//       ) : (
//         <div>
//           {cartdata.map((Item, index) => {
//             const productdata = products.find((product) => product._id === Item._id);

//             if (!productdata) {
//               return null; // Skip rendering if the product data is not found
//             }

//             return (
//               <div
//                 key={index}
//                 className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//               >
//                 <div className="flex items-start gap-6">
//                   <img
//                     className="w-16 sm:w-20"
//                     src={productdata.image[0]}
//                     alt={productdata.name}
//                   />
//                   <div>
//                     <p className="text-xs sm:text-lg font-medium">{productdata.name}</p>
//                     <div className="flex items-center gap-5 mt-2">
//                       <p>
//                         {currency}
//                         {productdata.price}
//                       </p>
//                       <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">
//                         {Item.size}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <input
//                   onChange={(e) =>
//                     e.target.value === '' || e.target.value === '0'
//                       ? null
//                       : updatequantity(Item._id, Item.size, Number(e.target.value))
//                   }
//                   className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                   type="number"
//                   min={1}
//                   defaultValue={Item.quantity}
//                 />
//                 <img
//                   onClick={() => {
//                     updatequantity(Item._id, Item.size, 0); // Remove item from context
//                   }}
//                   className="w-4 mr-4 sm:w-5 cursor-pointer"
//                   src={assets.bin_icon}
//                   alt="Delete"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       )}
//       {cartdata.length > 0 && ( // Only show cart total and checkout button if there are items
//         <div className="flex justify-end my-20">
//           <div className="w-full sm:w-[450px]">
//             <Carttotal />
//             <div className="w-full text-end">
//               <button
//                 onClick={() => navigate('/Placeorder')}
//                 className="bg-black text-white text-sm my-8 px-8 py-3"
//               >
//                 PROCEED TO CHECKOUT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;

