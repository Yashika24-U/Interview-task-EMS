import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validation

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid Email address.";
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

    return newErrors; // Return the errors object
  };

  // Form Submit

  const handleSubmit = async (event) => {

    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`http://localhost:8000/api/auth/login`, formData);

      if (response.status === 200) {
        navigate('/dashboard')
        console.log('User logged successfully');
        // localStorage.setItem("usersdatatoken", response.result.token);

      }
    }
    catch (error) {
      if (error.response) {
        setErrors({ api: error.response.data.message || 'Something went wrong' });
      }
      else {
        setErrors({ api: 'Network error, please try again later.' });
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading ? (
          <div className="min-h-screen flex justify-center items-center">
            <img src="../loader.gif" alt="Loading..." className="w-12 h-12" />
          </div>

        ) : (
          <div>
            <nav className="bg-blue-800 text-white py-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center px-4">
                <div className="text-xl font-bold">
                  <a href="/" className="hover:text-gray-200 transition">Employee Management System</a>
                </div>
              </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                <form>

                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm text-gray-600 mb-2">Email</label>
                    <input
                      id="username"
                      type="text"
                      value={formData.email}
                      onChange={(e) => setformData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>


                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} // Toggles between text and password
                        name="password"
                        value={formData.password}
                        onChange={(e) => setformData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
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

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Login;
