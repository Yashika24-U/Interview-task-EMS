import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Edituser = () => {


    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/employee/emp/${id}`)
                setUser(response.data)
            }
            catch (error) {
                console.error('Failed to fetch user data');
            }
        }
        fetchUser();
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('id', id)
            const response = await axios.put(`http://localhost:8000/api/employee/emp/${id}`, user)
            console.log('res', response)
            console.log('User updated successfully')
            navigate.push('/')
        }
        catch (error) {
            console.log('Error updating user data');
        }

    }
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold">Edit User</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={user.designation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Courses</label>
                    <input
                        type="text"
                        name="courses"
                        value={user.courses}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" onSubmit={handleSubmit} className="w-full py-2 px-4 bg-blue-500 text-white rounded">Update User</button>
            </form>
        </div>
    );
};


export default Edituser