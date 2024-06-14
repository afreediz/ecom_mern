import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import API from '../../services/api';
const CreateCategory = ({setDisplayAdd, setCategories}) => {
  const [product, setProduct] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/category', product);
      setCategories((prev)=>{
        return [data.category, ...prev]
      });
      setDisplayAdd(false)
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center bg-gray-100">
      <div className="w-full p-8 pt-0">
        <div className="flex justify-between items-center">
          <i></i>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-1">Create Category</h1>
          <IoMdClose className='text-2xl' onClick={() => setDisplayAdd(false)} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="category Name"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;