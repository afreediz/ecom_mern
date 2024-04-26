import React from 'react'
// import { cart } from '../datas'
import CartCard from '../components/utilities/CartCard'
import { useAuth } from '../context/user'
import { useCart } from '../context/cart'



const Cart = () => {
  const {cart, setCart} = useCart();
  const shipping_charge = 500
  console.log(cart)
  const totalPrice = ()=> {
    let total = 0;
    cart?.map((p)=>{
      total = total + p.price * p.cart_quantity
    })
    total = total + shipping_charge
    return total.toLocaleString("en-Us",{
      style:"currency",
      currency:'USD'
    })
  }
  // const {cart, setCart} = useCart();
  return (
    <div className='grid grid-cols-8'>
      <div className="products col-span-5">
        <h1>Products</h1>
        {
          cart?.map((p, index)=>{
            return(<CartCard product={p} key={index} />)
          })
        }
      </div>
      <div className="summary col-span-3">
        <h1>Cart summary</h1>
        <h2>No. of products : {cart?.length}</h2>
        <div className="costs">
          <h2>individual costs</h2>
          <div className="individual-costs">
            {cart?.map((p, index)=>{
              return(
                <div key={index}>
                  <span>{p.name} * {p.cart_quantity} : {p.price}</span> 
                </div>
              )})
            }  
          </div>
          <h3>Shipping charge : {shipping_charge}</h3>
          <h2>Grand total : {totalPrice()}</h2>
        </div>
        <button className='p-4 bg-green-700 text-white'>PAY</button>
      </div>
    </div>
  )
}

export default Cart
