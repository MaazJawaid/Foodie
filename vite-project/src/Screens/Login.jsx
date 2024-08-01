import React, { useState } from 'react';
import BackgroundImage from '../assets/Register/BackgroundRegister.jpg';
import { loginSuccess, loginFailure } from '../redux/loginSlicer/loginSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogout } from '../redux/adminSclicer/adminSlice';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showError, setShowError] = useState(false)
  const isAdminAuthenticated = useSelector(state => state.admin.isAdminAuthenticated);
  const [isChecked, setIsChecked] = useState(false);
  const [userForm, setUserForm] = useState({
    email: '', password: '', terms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (type === 'checkbox') {
      const { checked } = e.target;
      setIsChecked(checked);
    };
    setUserForm({ ...userForm, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Use Axios for the HTTP request
      const response = await axios.post('http://localhost:3000/auth/login', userForm);

      // If login is successful, you might want to redirect the user or do something else
      console.log('Login successful', response.data);

      // Dispatch login success action
      dispatch(loginSuccess(response.data));

      if (isAdminAuthenticated) {
        dispatch(adminLogout())
      };

      // Clear the form state
      setUserForm({ email: '', password: '', terms: '' });
      setIsChecked(false);
      setShowError(false)

      navigate('/products')
    } catch (error) {
      // If login fails, handle the error
      if (error.response && error.response.status === 401) {
        // Invalid credentials
        console.log(error.response.data.error);

        // Dispatch login failure action
        dispatch(loginFailure(error.message));
        setShowError(true)
      } else {
        // Other errors
        console.error('Error logging in:', error.message);
      }
    }
  };

  return (
    <div className="bg-cover h-[100vh] flex items-center justify-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <section className="bg-gray-50 dark:bg-gray-900 bg-opacity-0 sm:mt-0 mt-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login Your Account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" onChange={handleInputChange} value={userForm.email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div className='field flex flex-col'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" onChange={handleInputChange} value={userForm.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  {showError ? <div className='credentials text-red-600 mt-3 ml-2'>Invalid Credentials</div> : <></>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" name='terms' checked={isChecked} type="checkbox" onChange={handleInputChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Remember Me</label>
                  </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="w-full text-black bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in your account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Register here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
