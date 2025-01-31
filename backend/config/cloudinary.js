import { v2 as cloudinary } from "cloudinary"

const connectcloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    console.log("Cloudinary Configuration:", cloudinary.config());
}
// CLOUDINARY_SECRET_KEY  CLOUDINARY_NAME  CLOUDINARY_API_KEY 

export default connectcloudinary;