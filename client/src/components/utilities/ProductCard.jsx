import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cart'

const ProductCard = ({data}) => {
  const {cart, setCart} = useCart()

  const add_to_cart = ()=> {
    setCart((old_cart)=>{
      return [
        ...old_cart,
        {
          quantity:1,
          ...data
        }
      ]
    })
  }
  return (
    <div className='card outline max-w-3/12 w-64 outline-1 outline-slate-500'>
      <div className="image">
        <img src="data:image/jpeg;base64,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" className='w-full' alt="" />
      </div>
      <div className="body">
        <div className="title">
          <h3 className='my-0'>{data.name}</h3>
          <h3 className='my-0'>{data.price}</h3>
        </div>
        <p className='desc'>{data.shortdesc}</p>
        <div className="buttons flex text-sm">
          <Link to={`/products/${data.slug}`} className='text-center w-1/2 py-4 bg-green-700 text-white' >More details</Link>
          <button onClick={add_to_cart} className='w-1/2 py-4 bg-blue-700 text-whit'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
