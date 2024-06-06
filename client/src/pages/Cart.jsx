import React from 'react'
import CartCard from '../components/utilities/CartCard'
import { useAuth } from '../context/user'
import { useCart } from '../context/cart'
import { toast } from 'react-toastify'
import API from '../services/api'

const Cart = () => {
  const {user} = useAuth()
  const {cart, setCart} = useCart();
  const shipping_charge = 500
  console.log(cart);
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
    try{
      const {data} = await API.post('/orders',{
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
      console.log(response?.data.message)
    }
  }
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-8 md:gap-8'>
      {/* Summary Section (For Mobile View) */}
      <div className="summary md:col-span-3 md:bg-gray-100 md:p-6 md:rounded-lg md:order-2">
        <h1 className="text-3xl font-semibold mb-4">Cart Summary</h1>
        <h2 className="text-lg mb-2">No. of Products: {cart?.length}</h2>
        
        {/* Individual Costs */}
        <div className="costs mb-4">
          <h2 className="text-lg mb-2">Individual Costs</h2>
          <div className="individual-costs">
            {cart?.map((product, index) => (
              <div key={index} className="flex justify-between mb-1">
                <span>{product.name} * {product.cart_quantity}: ${product.price * product.cart_quantity}</span>
              </div>
            ))}
          </div>
          
          {/* Shipping Charge */}
          <h3 className="text-lg mb-2">Shipping Charge: ${cart.length > 0 ? shipping_charge : 0}</h3>
          
          {/* Grand Total */}
          <h2 className="text-lg mb-2">Grand Total: {cart.length > 0 ? totalPrice() : 0}</h2>
        </div>
        
        {/* Checkout Button */}
        {!user && <p className="text-red-500 mb-4">Please login to checkout</p>}
        <button
          onClick={checkout}
          className={`w-full py-3 bg-green-500 text-white font-semibold rounded-md ${
            !user || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!user || cart.length === 0}
        >
          PAY
        </button>
      </div>

      {/* Products Section */}
      <div className="products md:col-span-5">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        {/* Display cart items */}
        {cart?.map((product, index) => (
          <CartCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Cart
