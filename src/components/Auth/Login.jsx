import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from '../ContextFiles/AuthContext'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", { email, password });
      const { token, user } = response.data;

      // Save token and user information to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log('User Data:', user);
      setUserData(user);
   
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home"); 
      }
    } catch (err) {
     
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
       
        setError("An unexpected error occurred. Please try again.");
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brandDark flex items-center justify-center text-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="absolute top-10 left-10 text-8xl font-bold text-white opacity-10">
          Coffee
        </h1>
        <h1 className="absolute bottom-10 right-10 text-8xl font-bold text-white opacity-10">
          Shop
        </h1>
      </div>

      <div className="relative z-10 container max-w-md bg-white text-gray-900 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
            <Link
                to="/forgot/password"
                className="font-medium text-primary hover:text-secondary"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:text-secondary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
