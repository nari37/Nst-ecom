// import React, { useContext, useEffect, useState } from 'react'
// import { Shopcontext } from '../context/Shopcontext'
// import { assets } from '../assets/frontend_assets/assets'
// import { useLocation } from 'react-router-dom';

// const Searchbar = () => {

//     const {search,setsearch,showsearch, setshowsearch} = useContext(Shopcontext);
//     const [visible,setVisible] = useState(false)
//     const location = useLocation();

//     useEffect(()=>{
//         if (location.pathname.includes('collection')){
//            setVisible(true);
//         }
//         else{
//             setVisible(false)
//         }
//     },[location])

//   return showsearch && visible ? (
//     <div className='border-t border-b bg-gray-50 text-center'>
//         <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 sm:w-1/2 '>
//           <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='search' className='flex-1 outline-none bg-inherit text-sm'/>
//           <img className='w-4' src={assets.search_icon} alt="" />
//         </div>
//         <img onClick={()=>setshowsearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
//     </div>
//   ) : null
// }


// export default Searchbar


import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const { search, setsearch, showsearch, setshowsearch } = useContext(Shopcontext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    // Side effect to control visibility based on the current route
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    // Search button click handler
    const handleSearch = () => {
        if (search.trim() !== '') {
            try {
                // Perform search operation here (e.g., filtering or querying API)
                console.log("Searching for:", search);
                // You can perform any search operation here, like filtering a list
            } catch (error) {
                console.error('Error during search operation:', error);
            }
        } else {
            console.log('Search input is empty');
        }
    }

    return showsearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 sm:w-1/2 '>
                <input 
                    value={search} 
                    onChange={(e) => setsearch(e.target.value)} 
                    type="text" 
                    placeholder='search' 
                    className='flex-1 outline-none bg-inherit text-sm'
                />
                {/* Search button */}
                <img 
                    onClick={handleSearch} 
                    className='w-4 cursor-pointer' 
                    src={assets.search_icon} 
                    alt="Search"
                />
            </div>
            {/* Cross icon to close the search bar */}
            <img 
                onClick={() => setshowsearch(false)} 
                className='inline w-3 cursor-pointer' 
                src={assets.cross_icon} 
                alt="Close"
            />
        </div>
    ) : null;
}

export default Searchbar;
