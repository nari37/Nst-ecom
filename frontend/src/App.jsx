import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <Searchbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/collection' element={<Collection/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>} />
    <Route path='/products/:_id' element={<Product/>} />
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/placeorder' element={<Placeorder/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/verify' element={<Verify/>}/>

  
   </Routes>
   <Footer/>
      </div>
  )
}

export default App