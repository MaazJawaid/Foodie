import React, { useState, useEffect } from 'react';
import BackgroundImage from '../assets/Register/BackgroundRegister.jpg';
import { adminLoginSuccess, adminLoginFailure } from '../redux/adminSclicer/adminSlice';
import { logout } from '../redux/loginSlicer/loginSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios

const Register = () => {
    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const isAdminAuthenticated = useSelector(state => state.admin.isAdminAuthenticated);
    const adminToken = useSelector(state => state.admin.adminToken);
    const adminUser = useSelector(state => state.admin.adminUser);
    const isAuthenticated = useSelector(state => state.login.isAuthenticated)

    const [userForm, setUserForm] = useState({
        name: '', password: ''
    });

    useEffect(() => {
        // Log Redux state variables whenever isAdminAuthenticated changes
        if (isAdminAuthenticated) {
            console.log('adminToken:', adminToken);
            console.log('adminUser:', adminUser);
        }
    }, [isAdminAuthenticated]); // Run effect when isAdminAuthenticated changes


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Use Axios for the HTTP request
            const response = await axios.post('http://localhost:3000/auth/admin/login', userForm, {
                withCredentials: true // Send cookies with the request
            });

            // If login is successful, do something with the response, like redirecting to another page
            console.log(response.data);
            // Redirect or do something else on successful login

            // Dispatch login success action
            dispatch(adminLoginSuccess(response.data));

            if (isAuthenticated) {
                dispatch(logout())
            };

            // Clear the form state
            setUserForm({ name: '', password: '' });
            setShowError(false)
        } catch (error) {
            // If login fails, handle the error
            if (error.response && error.response.status === 401) {
                // Invalid credentials
                console.log(error.response.data.error);

                // Dispatch login failure action
                dispatch(adminLoginFailure(error.message));
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
                                Admin Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="name" name="name" id="name" onChange={handleInputChange} value={userForm.name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                                </div>
                                <div className='field flex flex-col'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" onChange={handleInputChange} value={userForm.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    {showError ? <div className='credentials text-red-600 mt-3 ml-2'>Invalid Credentials</div> : <></>}
                                </div>
                                <button type="submit" onClick={handleSubmit} className="w-full text-black bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in your account</button>
                                <div className="abc flex flex-col items-center gap-y-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                        Name: admin
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                                        Password: admin
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
