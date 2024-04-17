import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useParams } from 'react-router-dom'

const CategoryProducts = () => {
  const [products, setProducts] = useState()
  const {slug} = useParams()
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/category/${slug}`)
        setProducts(data.products)
      }catch(error){
        throw error
      }
    }
    getProducts()
  },[slug])
  return (
    <div className='grid grid-cols-6'>
      <div className="sidebar col-span-1">
        <FilterSidebar productHandler={setProducts} />
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 flex flex-wrap gap-8">
          {products && products.map((product, index)=>{
            return <ProductCard data={product} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
