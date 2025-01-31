import express from 'express'
import { addtocart, getusercart, updatecart } from '../controllers/cartcontroller.js'
import authuser from '../middlewear/auth.js'

const cartrouter = express.Router()

cartrouter.get('/:userid', authuser, getusercart)
cartrouter.post('/add', authuser, addtocart)
cartrouter.post('/update', authuser, updatecart)

export default cartrouter