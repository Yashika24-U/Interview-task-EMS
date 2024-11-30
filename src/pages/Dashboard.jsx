import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [userCount, setuserCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  // Fetch total user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employee/count');
        console.log('response.count', response.data.totalCount)
        setuserCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employee/`);
        console.log('response.data', response.data)
        setUsers(response.data)
        setLoading(false)
      }
      catch (err) {
        console.error('Error fetching users:', err)
        setLoading(false)
      }
    }
    fetchUsers();

  }, [])


  const handleCreate = () => {
    navigate('/create');
  }


  // Delete Emp
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/employee/delete/${id}`);
      if (response.status === 200) {
        console.log('Employee deleted successfully');
        setUsers(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };








  return (
    <div>
      <div class="container mx-auto p-8 max-w-full">

        <nav class="bg-blue-800 text-white p-4 flex justify-between items-center">
          <div class="text-xl font-bold">Dashboard</div>
          <div>
            <button onClick class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
          </div>
        </nav>


        <div class="container mx-auto p-8">

          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-gray-700">Employee List</h2>
            <div class="flex items-center">
              <span class="mr-4 text-gray-600">Total Count:{userCount} </span>
              <button onClick={handleCreate} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Create Employee</button>
            </div>
          </div>


          <div class="mb-4">
            <label for="search" class="text-gray-600 mb-2">Search</label>
            <input type="text" id="search" placeholder="Enter Search Keyword" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>


          <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <table class="min-w-full table-auto w-full">
              <thead class="bg-gray-200 text-gray-700">
                <tr>
                  {/* <th class="px-4 py-2 text-left">Unique Id</th> */}
                  <th class="px-4 py-2 text-left">Image</th>
                  <th class="px-4 py-2 text-left">Name</th>
                  <th class="px-4 py-2 text-left">Email</th>
                  <th class="px-4 py-2 text-left">Mobile No</th>
                  <th class="px-4 py-2 text-left">Designation</th>
                  <th class="px-4 py-2 text-left">Gender</th>
                  <th class="px-4 py-2 text-left">Course</th>
                  <th class="px-4 py-2 text-left">Create Date</th>
                  <th class="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} class="border-t border-gray-200">

                    <td class="px-4 py-2">{user.image}</td>
                    <td class="px-4 py-2">{user.username}</td>
                    <td class="px-4 py-2">{user.email}</td>
                    <td class="px-4 py-2">{user.mobile}</td>
                    <td class="px-4 py-2">{user.designation}</td>
                    <td class="px-4 py-2">{user.gender}</td>
                    <td class="px-4 py-2">{user.courses}</td>
                    <td className="px-4 py-2">{new Date(user.createdAt).toISOString().substring(0, 10)}</td>
                    <td class="px-4 py-2">{user.action}</td>
                    <td class="px-4 py-2">
                      <div class="flex space-x-2">
                        <button onClick={() => deleteEmployee(user._id)} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                        <button onClick={() => navigate(`/emp/edit/${user._id}`)} class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard