// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from 'axios'
// import { backendUrl } from "../../../adim/src/App";

// export const Shopcontext = createContext();

// const Shopcontextprovider = (props) => {
//    const currency = '$';
//    const delivery_fee = 10;
//    const backendurl = import.meta.env.VITE_BACKEND_URL
//    const [search, setsearch] = useState('');
//    const [showsearch,setshowsearch] = useState(true);
//    const [cartitems,setcartitems] = useState({});
//    const [products, setproducts] = useState([]);
//     const [token, settoken] = useState('');
//    const navigate = useNavigate();

//    const { userid } = useParams();


// useEffect(() => {
//     console.log("Cart updated:", cartitems); // This will show the state after it's updated
//   }, [cartitems]);
  


//    const addtocart = async (itemid,size)=>{
  
//     if(!size){
//         toast.error('select product size')
//         return;
//     }

//     let  cartdata = structuredClone(cartitems);

//     if(cartdata[itemid]){
//         if(cartdata[itemid][size]) {
//             cartdata[itemid][size] += 1;
//         }
//         else{
//             cartdata[itemid][size] = 1;
//         }
//     }
//     else{
//         cartdata[itemid] = {};
//         cartdata[itemid][size] = 1;
//     }
//     setcartitems(cartdata);

//     if(token){
        

//             try {
//                       if (backendurl) {
//                            const url = backendurl.endsWith('/') ? backendurl + 'api/cart/add' : backendurl + '/api/cart/add';
                                
//                            await axios.post(url, { itemid, size }, { headers: { token } });
//                            } else {
//                                console.error('Backend URL is not defined!');
//                            }
            
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }
// }


//   const getcartcount = () =>{
//     let totalcount = 0;
//     for(const items in cartitems){
//         for(const item in cartitems[items]){
//             try{
//                if (cartitems[items][item] > 0) {
//                  totalcount += cartitems[items][item];
//                }
//              }catch (error){
//             } 

//         }
//     }
//     return  totalcount;
//   }
   
//   const updatequantity = async(itemid,size,quantity)=>{
//     let cartdata = structuredClone(cartitems);
//     cartdata[itemid][size] = quantity;
//     setcartitems(cartdata)

//      if(token){
//         try {
            
//             await axios.post(backendUrl + '/api/cart/update', {itemid,size,quantity} , {headers:{token}})

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//      }

//   }

//   const getcartamount =  () =>{
//     let totalamount = 0;
    
//     for(const items in cartitems){
//         let iteminfo = products.find((product)=> product._id === items);

       

//         for (const item in cartitems[items]){
//             try{
//                 if (cartitems[items][item] > 0) {
//                     totalamount += iteminfo.price * cartitems[items][item];
//                 }
//             } catch (error){

//             }
//         }
//     }
//      return totalamount;
//   }

//       const getproductsdata = async () => {
//         try {
//             const response = await axios.get(backendurl + '/api/product/list')
//             if(response.data.success){
//                 setproducts(response.data.products)
//             } else{
//                 toast.error(response.data.message)
//             }
//         } catch (error) {
//              console.log(error)
//              toast.error(error.message)
//         }
//       }

//       const getusercart = async (req, res) => {
//         try {
//           const {userid} = req.params;

//           // Validate userid
//           if (!userid) {
//             return res.status(500).json({ success: true, message: "User ID is required" });
//           }
      
//           const userdata = await usemodel.findById(userid);
//           console.log(userdata,"hjhghj")
      
//           // Check if user exists
//           if (!userdata) {
//             return res.status(404).json({ success: false, message: "User not found" });
//           }
      
//           // Ensure cartdata is initialized
//           const cartdata = userdata.cartdata || {};
      
//           res.json({ success: true, cartdata });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ success: false, message: error.message });
//         }
//       };
      


//       useEffect(()=>{
//         getproductsdata()
//       },[])
           
//          useEffect(()=>{
//             if(!token && localStorage.getItem('token')){
//                settoken(localStorage.getItem('token'))
//                getusercart(localStorage.getItem('token'))
//             }
//          },[])

//     const value = {
//        products, currency,delivery_fee,
//        search,setsearch,showsearch,setshowsearch,
//        cartitems,addtocart,setcartitems,
//        getcartcount,updatequantity,
//        getcartamount, navigate, backendurl,
//        settoken,token,userid

       
//     };

//     return (
//         <Shopcontext.Provider value={value}>
//             {props.children}
//         </Shopcontext.Provider>
//     );
// };

// export default Shopcontextprovider;





import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
   const currency = '₹';
   const delivery_fee = 10;
   const backendurl = import.meta.env.VITE_BACKEND_URL;
   const [search, setsearch] = useState('');
   const [showsearch, setshowsearch] = useState(true);
   const [cartitems, setcartitems] = useState({});
   const [products, setproducts] = useState([]);
   const [token, settoken] = useState('');
   const navigate = useNavigate();

   const { userid } = useParams(); // Extract userid from URL

   console.log(cartitems,"userid.................")

   // Fetch products data
   const getproductsdata = async () => {
      try {
         const response = await axios.get(`${backendurl}/api/product/list`);
         if (response.data.success) {
            setproducts(response.data.products);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error(error);
         toast.error(error.message);
      }
   };

   // Fetch user cart
   const getusercart = async () => {
      if (!userid) {
         console.warn("User ID is missing.");
         return;
      }
      try {
         const response = await axios.get(`${backendurl}/api/cart/${userid}`, {
            headers: { token },
         });
         if (response.data.success) {
            setcartitems(response.data.cartdata);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error(error);
         toast.error(error.message);
      }
   };

   // Add item to cart
   const addtocart = async (itemid, size) => {
      if (!size) {
         toast.error('Please select a product size');
         return;
      }

      let cartdata = structuredClone(cartitems);

      if (cartdata[itemid]) {
         cartdata[itemid][size] = (cartdata[itemid][size] || 0) + 1;
      } else {
         cartdata[itemid] = { [size]: 1 };
      }

      setcartitems(cartdata);

      if (token) {
         try {
            await axios.post(`${backendurl}/api/cart/add`, { itemid, size }, {
               headers: { token },
            });
         } catch (error) {
            console.error(error);
            toast.error(error.message);
         }
      }
   };

   // Utility functions
   const getcartcount = () => {
      return Object.values(cartitems).reduce(
         (total, item) => total + Object.values(item).reduce((sum, count) => sum + count, 0),
         0
      );
   };

   const getcartamount = () => {
      return Object.entries(cartitems).reduce((total, [itemid, sizes]) => {
         const iteminfo = products.find(product => product._id === itemid);
         if (!iteminfo) return total;

         const itemtotal = Object.values(sizes).reduce(
            (sum, count) => sum + count * iteminfo.price,
            0
         );
         return total + itemtotal;
      }, 0);
   };

   // Effects
   useEffect(() => {
      getproductsdata();
   }, []);

   useEffect(() => {
      if (!token && localStorage.getItem('token')) {
         settoken(localStorage.getItem('token'));
      }
      if (userid) {
         getusercart();
      }
   }, [token, userid]);

   const updatequantity = async(itemId,size,quantity)=>{
   const cartData = structuredClone(cartitems)
   
   cartData[itemId][size] = quantity;

   setcartitems(cartData)
   }


   const value = {
      products,
      currency,
      delivery_fee,
      search,
      setsearch,
      showsearch,
      setshowsearch,
      cartitems,
      addtocart,
      setcartitems,
      getcartcount,
      getcartamount,
      navigate,
      backendurl,
      settoken,
      token,
      userid,
      updatequantity
   };

   return (
      <Shopcontext.Provider value={value}>
         {props.children}
      </Shopcontext.Provider>
   );
};

export default Shopcontextprovider;





