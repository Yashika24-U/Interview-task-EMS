import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
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
          username: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          mobile: formData.mobile.trim()
        }
        const response = await axios.post(`http://localhost:8000/api/auth/register`, dataToSend)
        console.log('response', response)

        if (response.status === 201) {
          toast.success("User Registered Successfull!", { autoClose: 5000 })
        }
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: ""
        })

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
    <>
      <nav class="bg-blue-800 text-white py-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center px-4">
          <div class="text-xl font-bold">
            <a href="/register" class="hover:text-gray-200 transition">Employee Management System</a>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {/* <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4"> */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mx-auto">

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Registration Form
          </h2>
          <form>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter the Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="Enter the Email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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

            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Mobile No</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                placeholder="Enter the Mobile Number"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>

          {/* Toast Container */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Register;
