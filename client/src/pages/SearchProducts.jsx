import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useParams } from 'react-router-dom'

const SearchProducts = () => {
    const [products, setProducts] = useState()
    const [allProducts, setAllProducts] = useState()
    const {query} = useParams()
  useEffect(()=>{
    async function getSearchResults(){
        console.log('searching');
        try{
          const {data} = await API.get(`products/search/${query}`)
          setAllProducts(data.products)
          setProducts(data.products)
        }catch(error){
          console.log(error);
        }
    }
    getSearchResults()
  },[query])
  return (
    <div className='grid grid-cols-6'>
      <div className="sidebar col-span-1">
        <FilterSidebar productHandler={setProducts} allProducts={allProducts} />
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 grid grid-cols-8 gap-4">
          {products && products.length == 0 && <div className='text-black font-bold text-3xl'>No products</div>}
          {products && products.map((product, index)=>{
            return <ProductCard data={product} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchProducts
