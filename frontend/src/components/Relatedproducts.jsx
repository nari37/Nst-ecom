import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Productsitem from './Productsitem';

const Relatedproducts = ({category,subcategory}) => {

  const { products} = useContext(Shopcontext)
  const [related,setrelated] = useState([]);
    

  useEffect(()=>{
    if (products.length > 0){
            let productscopy = products.slice();

            productscopy = productscopy.filter((item)=> category === item.category);
            productscopy = productscopy.filter((item)=> subcategory === item.subcategory)

            setrelated(productscopy.slice(0,5));
    }
  },[])
    return (
    <div className='my-24'>
    <div className='text-center text-3xl py-2'>
      <title text1={'RELATED'} text2={"PRODUCTS"} />
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {related.map((item,index)=>(
            <Productsitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))}
    </div>
    </div>
  )
}

export default Relatedproducts