import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch total user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employee/count');
        setUserCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employee/');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially display all users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreate = () => {
    navigate('/create');
  }


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
      // user.email.toLowerCase().includes(query.toLowerCase()) ||
    );

    setFilteredUsers(filtered); // Update filtered users based on query
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/employee/delete/${id}`);
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        setFilteredUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-8 max-w-full">
        <nav className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">Dashboard</div>
          <div>
            <button onClick={() => navigate('/logout')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
          </div>
        </nav>

        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Employee List</h2>
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">Total Count: {userCount}</span>
              <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Create Employee</button>
            </div>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <label htmlFor="search" className="text-gray-600 mb-2">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Enter Search Keyword"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto w-full">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile No</th>
                  <th className="px-4 py-2 text-left">Designation</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Create Date</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-t border-gray-200">
                      <td className="px-4 py-2">{user.image}</td>
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.mobile}</td>
                      <td className="px-4 py-2">{user.designation}</td>
                      <td className="px-4 py-2">{user.gender}</td>
                      <td className="px-4 py-2">{user.courses}</td>
                      <td className="px-4 py-2">{new Date(user.createdAt).toISOString().substring(0, 10)}</td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button onClick={() => deleteEmployee(user._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                          <button onClick={() => navigate(`/emp/edit/${user._id}`)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-2 text-center">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
