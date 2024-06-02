import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
const CreateProduct = ({setDisplayAdd}) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    shortDesc: '',
    longDesc: '',
    imageUrl: '',
    imageFile: null,
  });

  const categories = ['Electronics', 'Books', 'Clothing', 'Sports']; // Sample categories

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="absolute inset-0 flex justify-center bg-gray-100">
      <div className="w-full p-8 pt-0 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <i></i>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-1">Create Product</h1>
          <IoMdClose className='text-2xl' onClick={() => setDisplayAdd(false)} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="shortDesc">Short Description</label>
            <textarea
              id="shortDesc"
              name="shortDesc"
              value={product.shortDesc}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short Description"
              rows="2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="longDesc">Long Description</label>
            <textarea
              id="longDesc"
              name="longDesc"
              value={product.longDesc}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Long Description"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Image URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="imageFile">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              onChange={handleFileChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;