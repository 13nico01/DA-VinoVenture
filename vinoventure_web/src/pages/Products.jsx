import React from 'react'
import Navbar from '../components/MainComponents/Navbar'
import MainShop from "../components/ShopComponents/MainShop"
import Footer from "../components/MainComponents/Footer"
import FooterMain from '../components/MainComponents/Footer'

function Products() {
  return (
    <div>
      <Navbar/>
      <div className='pt-16'>
      <MainShop/>
      <FooterMain/>
      </div>
    </div>
  )
}

export default Products
