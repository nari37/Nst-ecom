// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Shopcontext } from '../context/Shopcontext'
// import { assets } from '../assets/frontend_assets/assets';
// import Relatedproducts from '../components/Relatedproducts';

// import { toast } from 'react-toastify';

// const Product = () => {

// const {products, currency, addtocart} = useContext(Shopcontext);
// const { _id } = useParams();

// // alert(products)

// const [productdata, setProductData] = useState(null);
// const [image, setImage] = useState();
// const [size,setsize] = useState('');

// const fetchProductData = () => {
// const foundProduct = products.find(item => item._id === _id);
//         if (foundProduct) {
//             setProductData(foundProduct);
//             setImage(foundProduct.image[0]);
           
//         }
//     };

//     useEffect(() => {
//         fetchProductData();
//     }, [_id, products]);

//     return productdata ? (
//         <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//             <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//                 {/* Product images */}
//                 <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//                     <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//                         {productdata.image.map((item, index) => (
//                             <img
//                                 onClick={() => {
//                                     console.log('Image clicked:', item);
//                                     setImage(item);
//                                 }}
//                                 src={item}
//                                 key={index}
//                                 className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
//                                 alt={`Product thumbnail ${index + 1}`}
//                             />
//                         ))}
//                     </div>
//                     <div className="w-full sm:w-[80%]">
//                         <img className="w-full h-auto" src={image} alt="Selected product" />
//                     </div>
//                 </div>

//                 {/* Product info */}
//                 <div className="flex-1">
//                     <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1>
//                     <div className='flex items-center gap-1 mt-2'>
//                        <img src={assets.star_icon} alt="" className="w-3 5" />
//                        <img src={assets.star_icon} alt="" className="w-3 5" />
//                        <img src={assets.star_icon} alt="" className="w-3 5" />
//                        <img src={assets.star_icon} alt="" className="w-3 5" />
//                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//                        <p className='pl-2'>{122}</p>
//                     </div>
//                     <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
//                     <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
//                     <div className='flex flex-col gap-4 my-8'>
//                         <p>SELECT SIZE</p>
                        
//                         <div className='flex gap-2'>
//   {['S', 'M', 'L', 'XL','XXL'].map((item, index) => (
//     <button
//       onClick={() => setsize(item)}
//       className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
//       key={index}
//     >
//       {item}
//     </button>
//   ))}
// </div>
//   </div>
//     <button onClick={()=>addtocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
//       <hr className='mt-8 sm:w-4/5'/>
//         <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//            <p>100% ORIGINAL PRODUCT.</p>
//               <p>CASH ON DELIVERY IS AVAILABLE ON THIS PRODUCT.</p>
//                   <p> EASY RETURN AND EXCHANGE POLICY WITH IN 7 DAYS.</p>
//                      </div>
//                 </div>
//             </div>
//             {/* ------------DESCRPTION & REVIEW SECTION ---------- */}
//         <div className='mt-200'>
//             <div className='flex'>
//            <b className='border px-5 py-3 text-sm'>DESCRIPTION</b>
//             <p className='border px-5 py-3 text-sm'>REVIEWS (122)</p>
//             </div>
// <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
// <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus alias saepe, eveniet illum, ipsum quidem natus voluptate accusantium accusamus rerum, esse earum facilis magni libero voluptas deserunt itaque consequatur suscipit.</p>
// <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nam atque nihil laudantium non eum harum eligendi excepturi nesciunt architecto mollitia nulla libero molestias et blanditiis iure, aliquam exercitationem cum!</p>
// </div>
//         </div>
//         {/* ------display related products */}
//         <Relatedproducts category={productdata.category}subcategory={productdata.subcategory}/>
//         </div>
//     ) : (
//         <div className="opacity-0"></div>
//     );
// };

// export default Product;




import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/frontend_assets/assets';
import Relatedproducts from '../components/Relatedproducts';

import { toast } from 'react-toastify';

const Product = () => {
    const { products, currency, addtocart } = useContext(Shopcontext);
    const { _id } = useParams();

    const [productdata, setProductData] = useState(null);
    const [image, setImage] = useState();
    const [size, setsize] = useState('');

    const fetchProductData = () => {
        const foundProduct = products.find(item => item._id === _id);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [_id, products]);

    const handleAddToCart = () => {
        if (!size) {
            toast.warn("Please select a size before adding to cart.");
            return;
        }
        addtocart(productdata._id, size);
        toast.success("Product added to cart successfully!");
    };

    return productdata ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productdata.image.map((item, index) => (
                            <img
                                onClick={() => {
                                    console.log('Image clicked:', item);
                                    setImage(item);
                                }}
                                src={item}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt={`Product thumbnail ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="Selected product" />
                    </div>
                </div>

                {/* Product info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                       <img src={assets.star_icon} alt="" className="w-3 5" />
                       <img src={assets.star_icon} alt="" className="w-3 5" />
                       <img src={assets.star_icon} alt="" className="w-3 5" />
                       <img src={assets.star_icon} alt="" className="w-3 5" />
                       <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                       <p className='pl-2'>{122}</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>SELECT SIZE</p>
                        
                        <div className='flex gap-2'>
  {['S', 'M', 'L', 'XL','XXL'].map((item, index) => (
    <button
      onClick={() => setsize(item)}
      className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
      key={index}
    >
      {item}
    </button>
  ))}
</div>
  </div>
    <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
      <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
           <p>100% ORIGINAL PRODUCT.</p>
              <p>CASH ON DELIVERY IS AVAILABLE ON THIS PRODUCT.</p>
                  <p> EASY RETURN AND EXCHANGE POLICY WITH IN 7 DAYS.</p>
                     </div>
                </div>
            </div>
            {/* ------------DESCRPTION & REVIEW SECTION ---------- */}
        <div className='mt-200'>
            <div className='flex'>
           <b className='border px-5 py-3 text-sm'>DESCRIPTION</b>
            <p className='border px-5 py-3 text-sm'>REVIEWS (122)</p>
            </div>
<div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus alias saepe, eveniet illum, ipsum quidem natus voluptate accusantium accusamus rerum, esse earum facilis magni libero voluptas deserunt itaque consequatur suscipit.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nam atque nihil laudantium non eum harum eligendi excepturi nesciunt architecto mollitia nulla libero molestias et blanditiis iure, aliquam exercitationem cum!</p>
</div>
        </div>
        {/* ------display related products */}
        <Relatedproducts category={productdata.category} subcategory={productdata.subcategory}/>
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
