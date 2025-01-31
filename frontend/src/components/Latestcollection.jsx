// import React, { useContext, useEffect, useState } from 'react';
// import { Shopcontext } from '../context/Shopcontext';
// import Title from './title';
// import Productsitem from './Productsitem';

// const Latestcollection = () => {
//     const { products } = useContext(Shopcontext);
//     const [latestproducts, setlatestproducts] = useState([]);

//     useEffect(() => {
//         if (products) {
//             setlatestproducts(products.slice(0, 30));
//         }
//     }, [products]);

//     console.log(products)

//     return (
//         <div className='my-10'>
//             <div className='text-center py-8 text-3xl'>
//                 <Title text1={'LATEST'} text2={'COLLECTIONS'} />
//                 <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque velit fugiat sint voluptatibus iste, corrupti debitis suscipit eius, rem fuga, dolorem eveniet. In reprehenderit architecto repudiandae aperiam molestiae possimus saepe.
//                 </p>
//             </div>
//             {/* Rendering products */}
//             <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//                 {latestproducts?.length > 0 ? (
//                     latestproducts.map((item, index) => (
//                         <Productsitem
//                             key={index}
//                             id={item._id}
//                             image={item.image}
//                             name={item.name}
//                             price={item.price}
//                         />
//                     ))
//                 ) : (
//                     <p className="col-span-full text-center">No products available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Latestcollection;



import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Title from './Title.jsx';
import Productsitem from './Productsitem';

const Latestcollection = () => {
    const { products } = useContext(Shopcontext);
    const [latestproducts, setlatestproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products) {
            setlatestproducts(products.slice(0, 30));
            setLoading(false); // Stop loading once products are set
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque velit fugiat sint voluptatibus iste, corrupti debitis suscipit eius, rem fuga, dolorem eveniet. In reprehenderit architecto repudiandae aperiam molestiae possimus saepe.
                </p>
            </div>

            {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {loading ? (
                    <p className="col-span-full text-center text-gray-500">Loading products...</p>
                ) : latestproducts.length > 0 ? (
                    latestproducts.map((item, index) => (
                        <Productsitem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products available</p>
                )}
            </div>
        </div>
    );
};

export default Latestcollection;
