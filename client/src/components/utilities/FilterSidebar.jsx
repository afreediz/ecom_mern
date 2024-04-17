import React, { useState } from 'react'
import { categories } from '../../datas'

const FilterSidebar = ({productHandler}) => {
  const [price, setPrice] = useState({
    min:null,
    max:null
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
  const apply = ()=> {
    productHandler((old_products)=>{
      return old_products.filter((product)=>{
        if(product.price > price.min && product.price < price.max){
          return product
        }
      })
    })
  }
  return (
    <div className=''>
        <h1 className='inline border-b-2 border-slate-500 text-4xl'>Filters</h1>
        <h2 className='text-2xl font-medium py-2'>Brand</h2>
        {/* <div className="text-black">
            {categories.map((c, index)=>{
            return(<div key={index} className="">
                <input type="checkbox" name="" id="" /> {c.name}
            </div>)
            })}
        </div> */}
        <h2 className='text-2xl font-medium py-2'>Price</h2>
        <div className="price">
            <div className="my-2">
            min : <input value={price.min} name='min' onChange={onchange} type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
            <div className="my-2">
            max : <input value={price.max} name='max' onChange={onchange} type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
        </div>
        <button onClick={apply} className='py-2 px-4 bg-green-600 text-white font-semibold'>apply</button>
    </div>
  )
}

export default FilterSidebar
