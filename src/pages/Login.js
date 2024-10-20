import React, { useState } from 'react'
import logo from '../images/logo.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiUrl } from '../config.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/admin/login`, {
        email,
        password
      });
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token, { expires: 1 });
        toast.success("Login successful")
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Invalid email or password") 
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl h-auto bg-secondary shadow-xl rounded-lg p-6 border-gray-50">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full md:w-1/2 text-center">
            <img src={logo} alt="Logo" className="mx-auto w-3/4 h-auto md:w-96 md:h-80" />
          </div>

          <div className="w-full md:w-1/2 pl-0 md:pl-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl text-primary font-raleway font-semibold">Login</h1>
            </div>
            <div className="flex flex-col items-center">
              <form onSubmit={handleSubmit}>
                <div className="w-full mb-4">

                  <label className="block font-raleway text-sm text-left mb-1">Email</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full mb-6">
                  <label className="block font-raleway text-sm text-left mb-1">Password</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="relative -top-8 left-44 text-sm">
                    <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEye : faEyeSlash} />
                  </div>
                </div>
                <div className='w-full'>
                  <button type='submit' className="w-full bg-button text-white font-raleway rounded-lg py-2 hover:bg-buttonHover transition">Login</button>
                </div>
              </form>
            </div>

          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 font-raleway">Connect with us:</p>
          <div className="flex justify-center space-x-4">
            <p className="cursor-pointer text-2xl " ><FontAwesomeIcon icon={faInstagram} /> </p>
            <p className="cursor-pointer text-2xl"><FontAwesomeIcon icon={faFacebook} /></p>
            <p className="cursor-pointer text-2xl"><FontAwesomeIcon icon={faWhatsapp} /></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login