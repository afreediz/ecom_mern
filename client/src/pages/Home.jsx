import React, { useEffect, useState } from 'react'
import ProductCard from '../components/utilities/ProductCard'
import API from '../services/api'
import FilterSidebar from '../components/utilities/FilterSidebar'
import { toast } from 'react-toastify'

const Home = () => {
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(()=>{
    async function getProducts(){
      try{
        const {data} = await API.get(`products/list/${page}`)
        const res = await API.get(`products/count`)
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
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getProducts()
  },[page])
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
          <div className="flex justify-center items-center mt-8">
            {products && products.length < totalProducts && (
              <button
                onClick={() => { setPage(page + 1); }}
                className="text-2xl text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  }

export default Home
