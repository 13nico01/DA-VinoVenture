import React from 'react'
import Navbar from '../components/MainComponents/Navbar'
import MainShop from "../components/ShopComponents/MainShop"

function Products() {
  return (
    <div>
      <Navbar/>
      <div className='pt-16'>
      <MainShop/>
      </div>
    </div>
  )
}

export default Products
