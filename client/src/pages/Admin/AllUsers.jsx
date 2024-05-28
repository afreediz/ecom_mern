import React, { useState } from 'react';

const AllUsers = () => {
  // Sample users data (replace with actual data from your backend)
  const [users, setUsers] = useState([
    { index: 1, id: 1001, username: 'JohnDoe', joinedDate: '2023-05-15', status: 'Active' },
    { index: 2, id: 1002, username: 'JaneSmith', joinedDate: '2023-06-20', status: 'Inactive' },
    // Add more users as needed
  ]);

  // Function to handle updating user status
  const handleStatusChange = (userId, newStatus) => {
    // Update the users state with the new status
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">All Users</h1>
        <table className="min-w-full bg-gray-800 text-white divide-y divide-gray-600">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Index</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.index}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.joinedDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  className="block w-full py-2 px-4 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
