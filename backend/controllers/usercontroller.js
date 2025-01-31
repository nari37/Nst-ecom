import validator from "validator";
import bycrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import usermodel from "../models/usermodel.js";

const createtoken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}


// route for user login
const loginuser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" })
    }
    const isMatch = await bycrypt.compare(password, user.password);

    if (isMatch) {

      const token = createtoken(user._id)
      res.json({ success: true, token })
    }

    else {
      res.json({ success: false, message: 'invalid credentials' })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// route for register

const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if user already exists
    const exists = await usermodel.findOne({email});
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hashing user password
    const salt = await bycrypt.genSalt(10);
    const hashedpassword = await bycrypt.hash(password, salt);

    const newuser = new usermodel({
      name,
      email,
      password: hashedpassword,
    });

    const user = await newuser.save();

    // Generating token
    const token = createtoken(user._id);
    res.json({ success:true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// route for admin login
// const jwt = require('jsonwebtoken');

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)

    // Check if the email and password match the environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Create a token with a secure payload
      // const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });

      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong, please try again." });
  }
};


export { loginuser, registeruser, adminlogin }