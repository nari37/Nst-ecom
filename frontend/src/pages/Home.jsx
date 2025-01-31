import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import Newsletterbox from '../components/Newsletterbox'

const Home =() => {
  return (
    <div> 
     <Hero/>
     <Latestcollection/>
     <Bestseller/>
     <Ourpolicy/>
     <Newsletterbox/>
    </div>
  )
}

export default Home