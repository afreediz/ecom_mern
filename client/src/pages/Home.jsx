import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const location = useLocation()
  const query = useQuery()
  console.log(query.get('search'));
  const [products, setProducts] = useState()
  const [allProducts, setAllProducts] = useState()
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get("products")
        setAllProducts(data.products)
        setProducts(data.products)
      }catch(error){
        throw error
      }
    }
    getProducts()
  },[])
  console.log(products);
  useEffect(()=>{
    async function getSearchResults(){
      if(query.get('search')){
        try{
          const {data} = await API.get(`products/search/${query.get('search')}`)
          console.log("search result",data);
          setProducts(data.products)
        }catch(error){
          console.log(error);
        }
      }
    }
    getSearchResults()
  },[location])
  return (
    <div className='grid grid-cols-6'>
      <div className="sidebar col-span-1">
        <FilterSidebar productHandler={setProducts} allProducts={allProducts} />
      </div>
      <div className=" col-span-5">
        <h1 className=' text-4xl  border-b-2 border-slate-500 inline'>All Products</h1>
        <div className="py-4 flex flex-wrap gap-8">
          {products && products.length == 0 && <div className='text-black font-bold text-3xl'>No products</div>}
          {products && products.map((product, index)=>{
            return <ProductCard data={product} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
