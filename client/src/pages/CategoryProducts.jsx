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
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalProductsDisplayed, setTotalProductsDisplayed] = useState(0)
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/category/${slug}/${page}`)
        const res = await API.get(`products/category/${slug}/count`)
        console.log(res);
        setTotalProducts(res.data.total)
        setProducts(data.products)
        setAllProducts(data.products)
      }catch(error){
        throw error
      }
    }
    getProducts()
  },[slug, page])
  console.log(totalProducts, totalProductsDisplayed);
  return (
    <div className='grid grid-cols-6'>
      <div className="sidebar col-span-1">
        <FilterSidebar productHandler={setProducts} allProducts={allProducts}  />
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 flex flex-wrap gap-8">
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
          { products && products.length == 6 && <button onClick={()=>{
            setPage(page+1)
          }} className='text-2xl text-blue-500 px-4 py-2'>Next</button> }
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
