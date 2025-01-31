// import jwt from 'jsonwebtoken'

// const adminauth = async (req,res,next) => {
//     try {
       
//         const token = req.headers.token;
//         console.log(token,"got token")
        
//          if (!token){
//             return res.json({success:false,message:"not authorized login again"})
//          }
//          const token_decode = jwt.verify(token,process.env.JWT_SECRET)
//          if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"not authorized login again"})
//          }
//          next()

//     } catch (error) {
//         console.log(error);
//         res,json({success:false, message: error.message})
//     }
// }

// export default adminauth






import jwt from 'jsonwebtoken';

const adminauth = async (req, res, next) => {
  try {
    // Get the token from headers
    const token = req.headers.token;
    console.log(token, "got token");

    

    // Decode and verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", token_decode);

    // Validate token payload against admin credentials
    if (
      token_decode.email !== process.env.ADMIN_EMAIL 
    ) {
      return res.json({ success: false, message: "Not authorized. Login again." });
    }

    // Proceed to the next middleware if validation passes
    next();

    // Check if token exists
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again." });
      }
  } catch (error) {
    console.error("Error in adminauth middleware:", error);
    res.json({ success: false, message: error.message || "Authentication failed" });
  }
};

export default adminauth;
