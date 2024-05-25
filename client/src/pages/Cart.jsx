import React from 'react'
// import { cart } from '../datas'
import CartCard from '../components/utilities/CartCard'
import { useAuth } from '../context/user'
import { useCart } from '../context/cart'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api_url } from '../datas'
import API from '../services/api'

const Cart = () => {
  const {user} = useAuth()
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
  const checkout = async()=>{
    console.log('checkout');
    try{
      const {data} = await API.post(api_url+'products/test-order',{
        cart:cart.map((product)=>{
          return {
            product:product._id,
            cart_quantity:product.cart_quantity
          }
        })
      })
      toast.success(data.message)
      setCart([])
    }catch({response}){
      toast.error(response.data.message)
    }
  }
  console.log(cart.length);
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
                  <span>{p.name} * {p.cart_quantity} : {p.price*p.cart_quantity}</span> 
                </div>
              )})
            }  
          </div>
          <h3>Shipping charge : {cart.length > 0 ? shipping_charge : 0}</h3>
          <h2>Grand total : {cart.length > 0 ? totalPrice() : 0}</h2>
        </div>
        {!user && "login to checkout"} <br />
        <button disabled={!user || cart.length == 0?true:false} onClick={checkout} className={`p-4 ${cart.length == 0?'bg-slate-500':user?'bg-green-500':'bg-slate-500'} text-white`}>PAY</button>
      </div>
    </div>
  )
}

export default Cart
