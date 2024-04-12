import React from 'react'
import { cart } from '../datas'
import CartCard from '../components/utilities/CartCard'

const Cart = () => {
  return (
    <div className='grid grid-cols-8'>
      <div className="products col-span-5">
        <h1>Products</h1>
        {
          cart.map((c)=>{
            return(<CartCard />)
          })
        }
      </div>
      <div className="summary col-span-3">
        <h1>Cart summary</h1>
        <div className="costs">
          <h2>individual costs</h2>
          <div className="individual-costs">
            <div className="">
              <span>Shampoo * 2</span>
              <span>2000</span>
            </div>          
            <div className="">
              <span>Shampoo * 2</span>
              <span>2000</span>
            </div>
          </div>
          <h3>Shipping charge : </h3>
          <h2>Grand total : 7000</h2>
        </div>
        <button className='p-4 bg-green-700 text-white'>PAY</button>
      </div>
    </div>
  )
}

export default Cart
