import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure this path is correct

const Sidebare = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/add"> {/* Specify the target route */}
          <img className='w-5 h-5' src={assets.add_icon} alt="Add Items" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/list"> {/* Specify the target route */}
          <img className='w-5 h-5' src={assets.order_icon} alt="Add Items" />
          <p className='hidden md:block'>list Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/orders"> {/* Specify the target route */}
          <img className='w-5 h-5' src={assets.order_icon} alt="Add Items" />
          <p className='hidden md:block'>orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebare;
