// import jwt from 'jsonwebtoken'

// const authuser = async (req, res, next) => {

//     const { token } = req.headers;

//     if(!token){
//         return res.json({ success: false, message: 'not authorized login again' })

//     }
//     try {
        
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//          req.body.userid = token_decode.userid
//          next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message})
//     }
// }

// export default authuser


import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        // console.log(token,"....................")
        if (!token) {
            return res.json({ success: false, message: 'Not authorized. Login again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded,".........decode")

        req.body.userid = decoded.id;
        // console.log( req.body.userid ,".........bodyid")
        next();
    } catch (error) {
        console.log('Auth Error:', error.message);
        res.json({ success: false, message: error.message });
    }
};

export default authuser;
