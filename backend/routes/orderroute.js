import express from 'express'
import {placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus, verifystripe, verifyrazorpay} from '../controllers/ordercontroller.js'
import adminauth from '../middlewear/adminauth.js'
import authuser from '../middlewear/auth.js'

const orderrouter = express.Router()

// ADMIN FEATURES
orderrouter.post('/list',adminauth,allorders)
orderrouter.post('/status',adminauth,updatestatus)

//payment features
orderrouter.post('/placeorder',authuser, placeorder)
// orderrouter.post('/stripe',authuser, placeorderstripe)
orderrouter.post('/razorpay',authuser, placeorderrazorpay)

//user features
orderrouter.post('/userorders',authuser,userorders)

// verify payment
orderrouter.post('/verifystripe',authuser,verifystripe)
orderrouter.post('/verifrazorpay',authuser,verifyrazorpay)


export default orderrouter