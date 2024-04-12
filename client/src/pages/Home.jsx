import React from 'react'
import { categories } from '../datas'
import ProductCard from '../components/utilities/ProductCard'

const Home = () => {
  return (
    <div className='grid grid-cols-6 h-screen'>
      <div className="sidebar col-span-1">
        <h1 className='inline border-b-2 border-slate-500 text-4xl'>Filters</h1>
        <h2 className='text-2xl font-medium py-2'>Categories</h2>
        <div className="text-black">
          {categories.map((c)=>{
            return(<div className="">
              <input type="checkbox" name="" id="" /> {c.name}
            </div>)
          })}
        </div>
        <h2 className='text-2xl font-medium py-2'>Price</h2>
        <div className="price">
          <div className="my-2">
            min : <input type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
          </div>
          <div className="my-2">
            max : <input type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
          </div>
        </div>
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 flex flex-wrap gap-8">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}

export default Home
