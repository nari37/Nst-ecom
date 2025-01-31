import usemodel from "../models/usermodel.js"

const addtocart = async (req, res) => {
    try {
      const { userid, itemid, size } = req.body;
  
      // Validate input
      if (!userid || !itemid || !size) {
        return res.json({ success: false, message: "Invalid input data" });
      }
  
      // Fetch user
      const userdata = await usemodel.findById(userid);
      if (!userdata) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Initialize cartdata if not present
      let cartdata = userdata.cartdata || {};
  
      // Update cartdata
      if (cartdata[itemid]) {
        if (cartdata[itemid][size]) {
          cartdata[itemid][size] += 1;
        } else {
          cartdata[itemid][size] = 1;
        }
      } else {
        cartdata[itemid] = {};
        cartdata[itemid][size] = 1;
      }
  
      // Save updated cartdata
      await usemodel.findByIdAndUpdate(userid, { cartdata });
  
      res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  

// update to user cart
const updatecart = async (req, res) =>{
    try {
        
          const {userid, itemid, size, quantity} = req.body

          const userdata = await usemodel.findById(userid)
          let cartdata = await userdata.cartdata;

            cartdata[itemid][size] = quantity

            
            await usemodel.findByIdAndUpdate(userid, {cartdata})
            res.json({ success: true, message: "cart updates" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
    
}

// get user cart data

const getusercart = async (req, res) => {
    try {
      const { userid } = req.body.userid;
      
    console.log(userid,"id................")

      // Validate userid
      if (!userid) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
  
      // Check if userid is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ success: false, message: "Invalid User ID format." });
      }
  
      // Find user by ID
      const userdata = await usemodel.findById(userid);
  
      // Handle user not found
      if (!userdata) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      // Safely access cartdata
      const cartdata = userdata.cartdata || [];
  
      res.json({ success: true, cartdata });
    } catch (error) {
      console.error("Error in getusercart:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  



// const getusercart = async (req, res) =>{
//     try {
        
//     const { userid } = req.body

//     const userdata = await usemodel.findById(userid)
//           let cartdata = await userdata.cartdata;
   
//        res.json({success: true, cartdata})

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message})
//     }
    
// }

export { addtocart, updatecart, getusercart}