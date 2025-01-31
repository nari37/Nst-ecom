// import React, { useContext, useEffect, useState } from 'react'
// import { Shopcontext } from '../context/Shopcontext';
// import axios from 'axios';
// import { toast } from 'react-toastify'; 
// import { useNavigate } from 'react-router-dom';

// const Login = () => {

// const [currentstate, setcurrentstate] = useState('sign up');
// const {token, settoken, navigate, backendurl} = useContext(Shopcontext)

// const [name,setname] = useState('')
// const [password,setpassword] = useState('')
// const [email,setemail] = useState('')

// const onsubmithandler = async (event) =>{
// console.log(name,email,password)
// event.preventDefault();
//   try {
//   if(currentstate === 'sign up'){

//     const response = await axios.post(backendurl + 'api/user/register',{name,email,password})

//       if(response.data.success){
//         settoken(response.data.token)
//         localStorage.setItem('token 2',response.data.token)
//       } else {
//         toast.error(response.data.message)
//       } 
//     } else {
//          const response = await axios.post(backendurl + '/api/user/login',{email,password})
//          if (response.data.success){
//             settoken(response.data.token)
//             localStorage.setItem('token',response.data.token)
//          } else{
//           toast.error(response.data.message)
//          }

//       }

    
//   } catch (error) {
//     console.log(error)
//     console.log(error.message)

//   }
// }

// useEffect(()=>{
//   if(token){
//     navigate('/')

//   }
// },[token])

//   return (
//    <form onSubmit={onsubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentstate}</p>
//          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
//      </div>
//     {currentstate === 'login' ? '' : <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='NAME' required/>} 
//      <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='EMAIL' required/>
//      <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='PASSWORD' required/>
//      <div className='w-full flex justify-between text-sm mt-[-8px]'>
//       <p className='cursor-pointer'>Forgot your password</p>
//       {
//         currentstate === 'login'
//         ? <p onClick={()=>setcurrentstate('sign up')} className='cursor-pointer'>CREATE ACCOUNT</p>
//         : <p onClick={()=>setcurrentstate('login')} className='cursor-pointer'>LOGIN HERE</p>
//       }
//      </div>
//      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentstate === 'login' ? 'sign in' : 'sign up'}</button>
//    </form>
//   )
// }

// export default Login


// .....................





// import React, { useContext, useEffect, useState } from 'react';
// import { Shopcontext } from '../context/Shopcontext';
// import axios from 'axios';
// import { toast } from 'react-toastify'; 

// const Login = () => {
//   const [currentstate, setcurrentstate] = useState('login');
//   const { token, settoken, navigate, backendurl } = useContext(Shopcontext);

//   const [name, setname] = useState('');
//   const [password, setpassword] = useState('');
//   const [email, setemail] = useState('');

//   const onsubmithandler = async (event) => {          
//     event.preventDefault(); 
//     try {
//       if (currentstate === 'sign up') {
//         const response = await axios.post(`${backendurl}/api/user/register`, { name, email, password });
//         if (response.data.success) {
//           settoken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Sign-up successful!');
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post(`${backendurl}/api/user/login`, { email, password });
//         if (response.data.success) {
//           settoken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           toast.success('Login successful!');
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token]);

//   return (
//     <form
//       onSubmit={onsubmithandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="prata-regular text-3xl">{currentstate}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>
//       {currentstate === 'login' ? null : (
//         <input
//           name="signup-name"
//           onChange={(e) => setname(e.target.value)}
//           value={name}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="NAME"
//           required
//         />
//       )}
//       <input
//         name={currentstate === 'login' ? 'login-email' : 'signup-email'}
//         onChange={(e) => setemail(e.target.value)}
//         value={email}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="EMAIL"
//         required
//       />
//       <input
//         name={currentstate === 'login' ? 'login-password' : 'signup-password'}
//         onChange={(e) => setpassword(e.target.value)}
//         value={password}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="PASSWORD"
//         required
//       />
//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password</p>
//         {currentstate === 'login' ? (
//           <p onClick={() => setcurrentstate('sign up')} className="cursor-pointer">
//             CREATE ACCOUNT
//           </p>
//         ) : (
//           <p onClick={() => setcurrentstate('login')} className="cursor-pointer">
//             LOGIN HERE
//           </p>
//         )}
//       </div>
//       <button className="bg-black text-white font-light px-8 py-2 mt-4">
//         {currentstate === 'login' ? 'sign in' : 'sign up'}
//       </button>
//     </form>
//   );
// };

// export default Login;

// .................



import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons from react-icons

const Login = () => {
  const [currentstate, setcurrentstate] = useState('login');
  const { token, settoken, navigate, backendurl } = useContext(Shopcontext);

  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const onsubmithandler = async (event) => {
    event.preventDefault();
    try {
      if (currentstate === 'sign up') {
        const response = await axios.post(`${backendurl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Sign-up successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendurl}/api/user/login`, { email, password });
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onsubmithandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentstate}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentstate === 'login' ? null : (
        <input
          name="signup-name"
          onChange={(e) => setname(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="NAME"
          required
        />
      )}
      <input
        name={currentstate === 'login' ? 'login-email' : 'signup-email'}
        onChange={(e) => setemail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="EMAIL"
        required
      />
      <div className="relative w-full">
        <input
          name={currentstate === 'login' ? 'login-password' : 'signup-password'}
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          type={showPassword ? 'text' : 'password'} // Toggle type
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="PASSWORD"
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          className="absolute right-3 top-3 cursor-pointer text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentstate === 'login' ? (
          <p onClick={() => setcurrentstate('sign up')} className="cursor-pointer">
            CREATE ACCOUNT
          </p>
        ) : (
          <p onClick={() => setcurrentstate('login')} className="cursor-pointer">
            LOGIN HERE
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentstate === 'login' ? 'sign in' : 'sign up'}
      </button>
    </form>
  );
};

export default Login;
