import React from 'react';

const AllCategories = () => {
  // Fake categories data
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Toys & Games" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Categories</h1>
      <table className="min-w-full bg-gray-800 text-white divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Index
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Map through categories data */}
          {categories.map((category, index) => (
            <tr key={index} className="">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">{category.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCategories;
