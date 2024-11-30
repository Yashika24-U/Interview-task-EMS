import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const CreateUserPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: null,
    });

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid Email address.";
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile Number is required.";
        } else if (!/^\d+$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile Number must be numeric.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number.";
        } else if (!/[@$!%*?&]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character: @$!%*?&";
        }

        if (!formData.designation) newErrors.designation = "Please select a designation.";

        if (!formData.gender) newErrors.gender = "Please select a gender.";

        if (formData.courses.length === 0)
            newErrors.courses = "Please select at least one course.";

        if (!formData.image) newErrors.image = "Please upload an image (jpg/png).";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                courses: checked
                    ? [...prevData.courses, value]
                    : prevData.courses.filter((course) => course !== value),
            }));
        } else if (type === "file") {
            setFormData((prevData) => ({
                ...prevData,
                image: event.target.files[0],
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {

            try {
                const dataToSend = {
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                    mobile: formData.mobile.trim(),
                    designation: formData.designation,
                    gender: formData.gender,
                    courses: formData.courses,
                    image: formData.image,
                }

                const response = await axios.post(`http://localhost:8000/api/employee/create`, dataToSend)
                console.log('response', response)

                if (response.status === 201) {
                    toast.success("User created Successfull!", { autoClose: 5000 })
                }
                navigate('/dashboard')

            } catch (error) {
                console.log('error', error)
                toast.error(
                    error.response?.data?.message || "An error occurred while saving the data!",
                    { autoClose: 5000 }
                );
            }
        }
    };

    return (
        <div>
            <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div class="text-xl font-bold">Dashboard</div>
                <div>

                </div>
            </nav>
            <div className="container mx-auto p-6">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New User</h2>
                <form className="space-y-4">
                    {/* Username */}
                    <div className="mb-4">
                        <label name="username" className="block text-gray-600 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label name="email" className="block text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                    </div>

                    {/* Password */}

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggles between text and password
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                className="absolute right-4 top-2 text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"} {/* Show/Hide text */}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="mb-4">
                        <label name="mobile" className="block text-gray-600 mb-2">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Designation */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Designation</label>
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Fullstack Developer">Fullstack Developer</option>
                        </select>
                        {errors.designation && (
                            <p className="text-red-500 text-sm">{errors.designation}</p>
                        )}
                    </div>


                    {/* Gender */}

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Gender</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>


                    {/* Courses */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Courses</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="ReactJS"
                                    value="ReactJS"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                ReactJS
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="NodeJS"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                NodeJS
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="MongoDB"
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                MongoDB
                            </label>
                        </div>
                        {errors.courses && (
                            <p className="text-red-500 text-sm">{errors.courses}</p>
                        )}
                    </div>


                    {/* Image */}
                    <div className="mb-4">
                        <label name="image" className="block text-gray-600 mb-2">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                        >
                            Create User
                        </button>
                    </div>
                </form>
                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateUserPage;
