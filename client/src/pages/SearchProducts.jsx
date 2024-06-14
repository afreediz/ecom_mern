import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

const SearchProducts = () => {
    const [products, setProducts] = useState()
    const [allProducts, setAllProducts] = useState()
    const {query} = useParams()
  useEffect(()=>{
    async function getSearchResults(){
        try{
          const {data} = await API.get(`products/search/${query}`)
          setAllProducts(data.products)
          setProducts(data.products)
        }catch(error){
          toast.error(error.response?.data.message)
          console.log(error)
        }
    }
    getSearchResults()
  },[query])
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="sidebar lg:w-1/4 bg-white shadow-lg p-4 rounded-lg mb-4 lg:mb-0">
          <FilterSidebar productHandler={setProducts} allProducts={allProducts} />
        </div>
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-300 inline-block pb-2 mb-4">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
            {products && products.length === 0 && <div className="text-gray-700 font-bold text-2xl">No products</div>}
            {products && products.map((product, index) => {
              return <ProductCard data={product} key={index} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SearchProducts
