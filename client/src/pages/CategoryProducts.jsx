import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useParams } from 'react-router-dom'

const CategoryProducts = () => {
  const [products, setProducts] = useState()
  const [allProducts, setAllProducts] = useState()
  const {slug} = useParams()
  const [page, setPage] = useState(1)
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/category/${slug}/${page}`)
        const res = await API.get(`products/category/${slug}/count`)
        console.log(res);
        setProducts(data.products)
        setAllProducts(data.products)
      }catch(error){
        throw error
      }
    }
    getProducts()
  },[slug, page])
  return (
    <div className='grid grid-cols-6'>
      <div className="sidebar col-span-1">
        <FilterSidebar productHandler={setProducts} allProducts={allProducts}  />
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 grid grid-cols-8 gap-4">
          {products && products.length == 0 && <div className='text-black font-bold text-3xl'>No products</div>}
          {products && products.map((product, index)=>{
            return <ProductCard data={product} key={index} />
          })}
        </div>
        <div className='flex justify-center'>
          {page > 1 && <button onClick={()=>{
            setPage(page-1)
            }} className='border-2 border-slate-500 px-4 py-2'>Prev</button>}
          <span className='text-2xl text-slate-500 px-4 py-2'>page number : {page}</span>
          { products && products.length == 8 && <button onClick={()=>{
            setPage(page+1)
          }} className='text-2xl text-blue-500 px-4 py-2'>Next</button> }
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
