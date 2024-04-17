import React from 'react'
import { categories } from '../../datas'

const FilterSidebar = () => {
  return (
    <div className=''>
        <h1 className='inline border-b-2 border-slate-500 text-4xl'>Filters</h1>
        <h2 className='text-2xl font-medium py-2'>Categories</h2>
        <div className="text-black">
            {categories.map((c, index)=>{
            return(<div key={index} className="">
                <input type="checkbox" name="" id="" /> {c.name}
            </div>)
            })}
        </div>
        <h2 className='text-2xl font-medium py-2'>Price</h2>
        <div className="price">
            <div className="my-2">
            min : <input type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
            <div className="my-2">
            max : <input type="text" className='p-2 w-4/12 border-b-2 border-slate-300'/>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar
