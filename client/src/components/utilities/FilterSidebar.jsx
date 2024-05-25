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
    <div className=''>
        <h1 className='inline border-b-2 border-slate-500 text-4xl'>Filters</h1>
        <h2 className='text-2xl font-medium py-0'>Price</h2>
        <form className="price" onSubmit={apply}>
            <div className="my-2">
            min : <input value={price.min} name='min' onChange={onchange} type="number" required className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
            <div className="my-2">
            max : <input value={price.max} name='max' onChange={onchange} type="number" required className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
            <button type='submit' className='py-2 px-4 bg-green-600 text-white font-semibold'>apply</button>
        </form>
    </div>
  )
}

export default FilterSidebar
