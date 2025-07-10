import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMsg(
        error.response?.data?.message || 'Login failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#FFF5E4] min-h-screen flex items-center justify-center px-4 font-sans"
      style={{ fontFamily: 'Poppins, Inter, Nunito, sans-serif' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-[#FFE3E1] rounded-2xl p-8 shadow-2xl w-full max-w-md flex flex-col items-center border border-[#FFD1D1]"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl font-bold text-[#FF9494] mb-2 tracking-wide">
            🌿Drivient
          </span>
          <span className="text-base text-gray-500 font-sans-secondary">
            Welcome! Please log in to continue
          </span>
        </div>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-white border border-[#FFD1D1] shadow focus:outline-none focus:ring-2 focus:ring-[#FF9494] text-base transition"
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-white border border-[#FFD1D1] shadow focus:outline-none focus:ring-2 focus:ring-[#FF9494] text-base transition"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
          )}

          <div className="flex justify-between items-center mt-1">
            <button
              type="button"
              className="text-[#FF9494] text-sm hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#FF9494] text-white font-medium text-base rounded-xl py-3 shadow-lg hover:bg-[#FFD1D1] hover:text-[#FF9494] hover:scale-105 transition-all duration-200 tracking-wide"
            style={{ fontFamily: 'Poppins, Inter, Nunito, sans-serif' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          New user?{' '}
          <Link to="/register" className="text-[#FF9494] font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
