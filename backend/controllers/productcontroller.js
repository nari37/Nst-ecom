import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productmodel.js";



const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestsellers } = req.body;

        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1, image2, image3, image4].filter((item) => item !== null);

       

        let imagesUrl = [];
        for (const item of images) {
            try {
                console.log("Uploading File Path:", item.path);
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                console.log("Uploaded Successfully:", result.secure_url);
                imagesUrl.push(result.secure_url);
            } catch (uploadError) {
                console.error("Cloudinary Upload Error Details:", uploadError);
                res.status(500).json({ success: false, message: "Cloudinary upload failed." });
                return;
            }
        }

        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
            
        } catch (error) {
            console.error("Error parsing sizes:", error);
            res.status(400).json({ success: false, message: "Invalid sizes format." });
            return;
        }

        const productdata = {
            name,
            description,
            category,
            price: Number(price),
            subcategory,
            bestsellers: bestsellers === "true",
            size: parsedSizes,
            image: imagesUrl,
            Date: new Date(),
        };

       

        const product = new productModel(productdata);
        await product.save();

        res.json({ success: true, message: "Product added successfully!" });
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};





// function for list product
const listproducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true, products})

    //    console.log(products)
    
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removingproduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "product removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleproduct = async (res, req) => {
    try {
        const { productid } = req.body
        const product = await productModel.findById(productid)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {addproduct, listproducts, singleproduct, removingproduct }