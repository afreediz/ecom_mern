import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  console.log(totalProducts);
  useEffect(()=>{
    async function getProducts(){
      console.log('getting');
      try{
        const {data} = await API.get(`products/list/${page}`)
        const res = await API.get(`products/count`)
        console.log(data);
        setProducts([
          ...products,
          ...data.products
        ])
        setAllProducts([
          ...allProducts,
          ...data.products
        ])
        setTotalProducts(res.data.total)
      }catch(error){
        console.log(error);
      }
    }
    getProducts()
  },[page])
  console.log(products);
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
        {products && products.length < totalProducts && <div className='flex justify-center'>
          <button onClick={()=>{
            setPage(page+1)
          }} className=' text-blue-500 text-2xl py-2 px-4 rounded-lg'>Load more</button>
        </div>}
      </div>
    </div>
  )
}

export default Home
