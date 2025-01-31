import ordermodel  from "../models/ordermodel.js";
import usemodel from "../models/usermodel.js";
import Stripe from'stripe';
import razorpay from 'razorpay';
import dotenv from 'dotenv';
// global variables
const currency = 'inr'
const deliverycharge = 10
dotenv.config();
// gateway intialize
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayinstance = new razorpay({
    key_id : process.env.RAZOR_KEY_ID,
    key_secret : process.env.RAZOR_KEY_SECRET
})
// placing orders cod method using 

const placeorder = async (req, res) => {
 
  try {
    
      const { userid, items, amount, address} = req.body;

      const orderdata = {
        userid,
        items,
        amount,
        address,
        paymentmethod:"cod",
        payment:false,
        date: Date.now()
      }

      const neworder = new ordermodel(orderdata)
      await neworder.save()

      await  usemodel.findByIdAndUpdate(userid,{cartdata:{}})

      res.json({success:true,message:"order placed"})

   } catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})
   }

}




// placing orders using stripe method

// const placeorderstripe = async (req, res) => {
// try {

//   const { userid, items, amount, address} = req.body
//   const { origin } = req.headers;

//   const orderdata = {
//     userid,
//     items,
//     amount,
//     address,
//     paymentmethod:"cod",
//     payment:false,
//     date: Date.now()
//   }

//   const neworder = new ordermodel(orderdata)
//   await neworder.save()

//   const line_items = items.map((item)=> ({
//     price_data: {
//       currency:currency,
//       Product_data: {
//         name:item.name
//       },
//       unit_amount: item.price * 100
//     },
//     quantity: item.quantity
//   }))

//   line_items.push({
//     price_data: {
//       currency:currency,
//       Product_data: {
//         name:'delivery charges'
//       },
//       unit_amount: deliverycharge * 100
//     },
//     quantity: 1
//   })
  
//   const session = await Stripe.Checkout.sessions.create({
//     success_url: `${origin}/verify?success=true&orderid=${neworder._id}`,
//     cancel_url: `${origin}/verify?success=false&orderid=${neworder._id}`,
//     line_items,
//     mode: 'payment',
//   })
      
//     res.json({success:true,success_url:session.url})

// } catch (error) {
//   console.log(error)
//   res.json({success:false,message:error.message})
// }


// }
const placeorderstripe = async (req, res) => {
  try {
    const { userid, items, amount, address } = req.body;
    const { origin } = req.headers;

    const currency = 'usd';  // Add your currency here
    const deliverycharge = 5; // Add your delivery charge amount here

    const orderdata = {
      userid,
      items,
      amount,
      address,
      paymentmethod: "stripe",
      payment: false,
      date: Date.now()
    };

    const neworder = new ordermodel(orderdata);
    await neworder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'delivery charges'
        },
        unit_amount: deliverycharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderid=${neworder._id}`,
      cancel_url: `${origin}/verify?success=false&orderid=${neworder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_Url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify stripe
const verifystripe = async (req,res)=>{
  const {orderid, success, userid} = req.body

  try {
    if(success === "true"){
      await ordermodel.findByIdAndUpdate(orderid,{payment:true});
      await usemodel.findByIdAndUpdate(userid,{cartdata:{}})
      res.json({success: true})
    } else {
      await ordermodel.findByIdAndDelete(orderid)
      res.json({success:false})
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// placing orders using razorpay method
// const placeorderrazorpay = async (req, res) => {
//      try {
         
//       const { userid, items, amount, address} = req.body

//       const orderdata = {
//         userid,
//         items,
//         amount,
//         address,
//         paymentmethod: "razorpay",
//         payment: false,
//         date: Date.now()
//       };
  
//       const neworder = new ordermodel(orderdata);
//       await neworder.save();
     
//       const options = {
//         amount: amount * 100,
//         currency: currency.toUpperCase(),
//         receipt: neworder._id.tostring()
//       }
//        await razorpayinstance.orders.create(options,(error,order)=>{
//         if (error) {
//           console.log(error)
//           return res.json({success:false, message:error})
          
//         }
//         res.json({success:true,order})
//        })
//      } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//      }
// }

const placeorderrazorpay = async (req, res) => {
  try {
    const { userid, items, amount, address, currency = 'INR' } = req.body; // Default to INR if currency isn't passed

    const orderdata = {
      userid,
      items,
      amount,
      address,
      paymentmethod: "razorpay",
      payment: false,
      date: Date.now()
    };

    const neworder = new ordermodel(orderdata);
    await neworder.save();

    const options = {
      amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
      currency: currency.toUpperCase(), // Currency is passed in uppercase
      receipt: neworder._id.toString() // Make sure this is converted to string
    };

    await razorpayinstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order }); // Return the order object to the frontend
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const verifyrazorpay = async (req,res) =>{
  try {
      
   const {user, razorpay_order_id } = req.body
    
  const orderinfo = await razorpayinstance.orders.fetch(razorpay_order_id)
    if (orderinfo.status === 'paid') {
      await ordermodel.findByIdAndUpdate(orderinfo.receipt,{payment:true});
      await usermodel.findByIdAndUpdate(userid,{cartdata:{}})
      res.json({success:true, message:"payment successful"})
    }else{
            res.json({success:false, message:"payment failed"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// all orders data for admin panel
// const allorders = async (req, res) => {

//   try {

//     const orders = await ordermodel.find({})
//     res.json({success:true,orders})
//     console.log(orders)
   
    
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }

// }

// .............

const allorders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await ordermodel.find({});

    // Check if orders are found
    if (orders.length === 0) {
      return res.json({ success: true, orders: [] });
    }

    // Return the orders
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json({ success: false, message: error.message });
  }
};


// user order data for frontend
// const userorders = async (req, res) => {
//   try {
//     const { userid } = req.body
//     console.log(userid,'data')

//     const orders = await ordermodel.find({userid})
//     res.json({success:true,orders})


//   } catch (error) {
//     console.log(error)
//      res.json({success:false,message:error.message})
//   }


// }


const userorders = async (req, res) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      return res.json({ success: false, message: 'User ID is required' });
    }

    // console.log('User ID:', userid);

    // Fetch orders for the specific user
    const orders = await ordermodel.find({ userid });

    console.log('User ID:,........................', orders);

    if (orders.length === 0) {
      return res.json({ success: true, orders: [] });
    }

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// update order status from admin panel
const updatestatus = async (req, res) => {
         try {
             
             const { orderid, status} = req.body
                
               await ordermodel.findByIdAndUpdate(orderid, {status})
               res.json({success:true, message:'status updated'})

         } catch (error) {
          console.log(error)
          res.json({success:false,message:error.message})
         }
}

export {verifyrazorpay, verifystripe, placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus}