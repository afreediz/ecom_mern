import React, { useState } from 'react'
import { categories } from '../../datas'

const FilterSidebar = ({productHandler, allProducts}) => {
  const [price, setPrice] = useState({
    min:"",
    max:""
  })
  const onchange = (e) => {
    const { name, value } = e.target;
    setPrice((old_price)=>{
      return{
        ...old_price,
        [name]:value
      }
    })
  }
  const apply = (e)=> {
    e.preventDefault()
    productHandler(()=>{
      return allProducts.filter((product)=>{
        if(product.price >= price.min && product.price <= price.max){
          return product
        }
      })
    })
  }
  return (
    <div>
      <div className=" bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Filters</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Price</h2>
        <form className="price" onSubmit={apply}>
          <div className="my-2">
            <label className="block text-gray-700">Min:</label>
            <input value={price.min} name="min" onChange={onchange} type="number" required className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="my-2">
            <label className="block text-gray-700">Max:</label>
            <input value={price.max} name="max" onChange={onchange} type="number" required className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Apply</button>
        </form>
      </div>
    </div>
  );
  
}

export default FilterSidebar
