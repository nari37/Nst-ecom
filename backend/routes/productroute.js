import express from 'express'
import { addproduct, listproducts, removingproduct, singleproduct } from '../controllers/productcontroller.js';
import upload from '../middlewear/multer.js';
import adminauth from '../middlewear/adminauth.js';
export { listproducts, singleproduct, removingproduct, addproduct }  from '../controllers/productcontroller.js'

const productrouter = express.Router();

// productrouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct);
productrouter.post('/add', adminauth,upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]), addproduct);

productrouter.post('/remove',adminauth,removingproduct);
productrouter.post('/single',singleproduct);
productrouter.get('/list',listproducts)

export default productrouter