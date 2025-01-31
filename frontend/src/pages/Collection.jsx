

// import React, { useContext, useEffect, useState } from 'react'
// import { Shopcontext } from '../context/Shopcontext'
// import { assets } from '../assets/frontend_assets/assets';
// import Title from '../components/title';
// import Productsitem from '../components/Productsitem';

// const Collection = () => {
//     const { products, search, showsearch } = useContext(Shopcontext);

//     const [showfilter, setshowfilter] = useState(false);
//     const [filterproducts, setFilterproducts] = useState([]);
//     const [category, setcategory] = useState([]);
//     const [subcategory, setsubcategory] = useState([]);
//     const [sortType, setsortType] = useState('relevant');

//     // Toggle category filter
//     const togglecategory = (e) => {
//         if (category.includes(e.target.value)) {
//             setcategory(prev => prev.filter(item => item !== e.target.value));
//         } else {
//             setcategory(prev => [...prev, e.target.value]);
//         }
//     };

//     // Toggle subcategory filter
//     const togglesubcategory = (e) => {
//         if (subcategory.includes(e.target.value)) {
//             setsubcategory(prev => prev.filter(item => item !== e.target.value));
//         } else {
//             setsubcategory(prev => [...prev, e.target.value]);
//         }
//     };

//     // Apply filter based on search, category, and subcategory
//     const applyfilter = () => {
//         let productscopy = products.slice();

//         // Apply search filter (case-insensitive)
//         if (showsearch && search) {
//             productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
//         }

//         // Apply category filter
//         if (category.length > 0) {
//             productscopy = productscopy.filter(item => category.includes(item.category));
//         }

//         // Apply subcategory filter
//         if (subcategory.length > 0) {
//             productscopy = productscopy.filter(item => subcategory.includes(item.subcategory)); // Ensure you're checking 'subcategory' not 'subCategory'
//         }

//         // If no products match the filter, return an empty list
//         if (productscopy.length === 0) {
//             setFilterproducts([]); // Optional: handle no products found
//         } else {
//             setFilterproducts(productscopy);
//         }
//     };

//     // Sort filtered products based on selected sort type
//     const sortproduct = () => {
//         let fpcopy = filterproducts.slice();

//         switch (sortType) {
//             case 'low-high':
//                 setFilterproducts(fpcopy.sort((a, b) => a.price - b.price));
//                 break;
//             case 'high-low':
//                 setFilterproducts(fpcopy.sort((a, b) => b.price - a.price));
//                 break;
//             default:
//                 applyfilter();
//                 break;
//         }
//     };

//     // Run filter and sort logic whenever relevant states change
//     useEffect(() => {
//         applyfilter();
//     }, [category, subcategory, search, showsearch, products]);

//     useEffect(() => {
//         sortproduct();
//     }, [sortType, filterproducts]); // Ensure filterproducts are considered after sorting

//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
//       {/* Filter options */}
//       <div className='min-w-60'> 
//         <p onClick={() => setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
//           FILTERS
//           <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//         </p>

//         {/* CATEGORY FILTER */}
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sem font-medium'>CATEGORIES</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'men'} onChange={togglecategory}/> MEN
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'women'} onChange={togglecategory} /> WOMEN
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'kids'} onChange={togglecategory} /> KIDS
//             </p>
//           </div>
//         </div>

//         {/* SUBCATEGORY FILTER */}
//         <div className={`border border-gray-300 pl-5 py-3 my-6 ${showfilter ? '' : 'hidden'} sm:block`}>
//           <p className='mb-3 text-sem font-medium'>TYPE</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'topwear'} onChange={togglesubcategory} /> TOPWEAR
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'bottomwear'} onChange={togglesubcategory} /> BOTTOMWEAR
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'winterwear'} onChange={togglesubcategory} /> WINTERWEAR
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Products */}
//       <div className='flex-1'>
//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//           <Title text1={'all'} text2={'collections'} />
          
//           {/* Product sort */}
//           <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//             <option value="relavent">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         {/* Map filtered products */}
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//           {
//             filterproducts.map((item, index) => (
//               <Productsitem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Collection;





import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/title';
import Productsitem from '../components/Productsitem';

const Collection = () => {
    const { products, search, showsearch } = useContext(Shopcontext);

    const [showfilter, setshowfilter] = useState(false);
    const [filterproducts, setFilterproducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [subcategory, setsubcategory] = useState([]);
    const [sortType, setsortType] = useState('relevant');
    const [loading, setLoading] = useState(true);

    // Toggle category filter
    const togglecategory = (e) => {
        if (category.includes(e.target.value)) {
            setcategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setcategory(prev => [...prev, e.target.value]);
        }
    };

    // Toggle subcategory filter
    const togglesubcategory = (e) => {
        if (subcategory.includes(e.target.value)) {
            setsubcategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setsubcategory(prev => [...prev, e.target.value]);
        }
    };

    // Apply filter based on search, category, and subcategory
    const applyfilter = () => {
        setLoading(true); // Start loading before applying filters

        let productscopy = products.slice();

        // Apply search filter (case-insensitive)
        if (showsearch && search) {
            productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Apply category filter
        if (category.length > 0) {
            productscopy = productscopy.filter(item => category.includes(item.category));
        }

        // Apply subcategory filter
        if (subcategory.length > 0) {
            productscopy = productscopy.filter(item => subcategory.includes(item.subcategory));
        }

        setFilterproducts(productscopy);
        setLoading(false); // Stop loading after filtering
    };

    // Sort filtered products based on selected sort type
    const sortproduct = () => {
        setLoading(true); // Start loading before sorting

        let fpcopy = filterproducts.slice();

        switch (sortType) {
            case 'low-high':
                fpcopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                fpcopy.sort((a, b) => b.price - a.price);
                break;
            default:
                applyfilter();
                return;
        }

        setFilterproducts(fpcopy);
        setLoading(false); // Stop loading after sorting
    };

    // Run filter and sort logic whenever relevant states change
    useEffect(() => {
        applyfilter();
    }, [category, subcategory, search, showsearch, products]);

    useEffect(() => {
        sortproduct();
    }, [sortType]); // Ensure filterproducts are considered after sorting

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter options */}
            <div className='min-w-60'>
                <p onClick={() => setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/* CATEGORY FILTER */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sem font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'men'} onChange={togglecategory} /> MEN
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'women'} onChange={togglecategory} /> WOMEN
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'kids'} onChange={togglecategory} /> KIDS
                        </p>
                    </div>
                </div>

                {/* SUBCATEGORY FILTER */}
                <div className={`border border-gray-300 pl-5 py-3 my-6 ${showfilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sem font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'topwear'} onChange={togglesubcategory} /> TOPWEAR
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'bottomwear'} onChange={togglesubcategory} /> BOTTOMWEAR
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'winterwear'} onChange={togglesubcategory} /> WINTERWEAR
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Products */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'all'} text2={'collections'} />

                    {/* Product sort */}
                    <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map filtered products or show loading message */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {loading ? (
                        <p className="col-span-full text-center text-gray-500">Loading products...</p>
                    ) : filterproducts.length > 0 ? (
                        filterproducts.map((item, index) => (
                            <Productsitem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
