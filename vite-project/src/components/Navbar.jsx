import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'; // Import Axios
import shoppingCartIcon from '../assets/Navbar/icons8-shopping-cart-24.png';
import hamBurger from '../assets/Navbar/icons8-hamburger-50.png';
import reservationImage from '../assets/Navbar/icons8-fork-and-knife-66.png'
import productImage from '../assets/Navbar/icons8-food-service-50.png'
import contactUs from '../assets/Navbar/icons8-contact-us-50.png'
import orderImage from '../assets/Navbar/icons8-delivery-50.png'
import yourReservationImage from '../assets/Navbar/dinner-table.png'

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const sideBarRef = useRef(null);
  const navigate = useNavigate();
  const cartData = useSelector(state => state.cart.cartItem)

  // Mention the states of Users Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')

  // Extract authentication data from the Redux store
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user)
      setName(user.name);
      setEmail(user.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [isAuthenticated, user, token])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setSideBar(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Send a POST request to the server to logout
      const response = await axios.post('http://localhost:3000/auth/logout', null, {
        withCredentials: true // Send cookies with the request
      });

      if (response.status !== 200) {
        // Handle errors if any
        throw new Error(response.data.error || 'Logout failed');
      }

      // Logout successful, redirect or do something else
      console.log('Logout successful');
      window.location.reload(); // For example, reload the page
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle error in some way, like showing an error message to the user
    }
  };

  function getTotalItemCount(data) {
    if (data) {
      return data.length;
    }
    return 0
  }

  return (
    <>
      {/* Mobile View: Displayed before 640px */}
      <div className='Navbar  lg:hidden flex justify-between mx-[5%] items-center min-h-16 fixed z-20 bg-white top-0 -left-5 w-[110vw]'>
        {/* Mobile content here */}
        <div
          className={`sideBar bg-gray-50 z-10 h-screen rounded-e-2xl w-64 absolute px-8 py-5 top-0 ${sideBar ? 'left-0' : '-left-72'
            } transition-all duration-300 ease-in-out`}
          ref={sideBarRef}
        >
          <div className="mainSideBar h-full flex flex-col">
            <div className='Foodie font-bold text-red-600 text-xl self-center cursor-pointer' onClick={() => { navigate('/') }}>Foodie</div>
            <div className='sideContent mt-16'>
              <ul className='Content flex flex-col gap-6'>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer' onClick={() => { navigate('/orders') }}><img src={orderImage} alt='Product Image' className='productImage w-9'></img>Orders</li>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer' onClick={() => { navigate('/products') }}><img src={productImage} alt='Product Image' className='productImage w-9'></img>Menu</li>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer' onClick={() => { navigate('/service') }}><img src={reservationImage} alt='Product Image' className='productImage w-9'></img>Resrve</li>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer p-2' onClick={() => { navigate('/cart') }}><div className='cart flex cursor-pointer'> <img src={shoppingCartIcon} alt='cart' className='cart max-w-7 z-10'></img> <div className='itemQuantity text-red-600 font-bold'>{getTotalItemCount(cartData)}</div></div>Cart</li>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer' onClick={() => { navigate('/contact') }}><img src={contactUs} alt='Product Image' className='productImage w-9'></img>Contact</li>
                <li className='innerContent flex items-center gap-4 hover:bg-gray-200 rounded-full w-44 px-3 h-12 transition-all duration-500 ease-in-out cursor-pointer' onClick={() => { navigate('/your/reservations') }}><img src={yourReservationImage} alt='Product Image' className='productImage w-9'></img>Reservations</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='Navbar flex w-[98vw] justify-between'>
          <div className=' leftPart flex items-center gap-5 ml-3'>
            <img
              src={hamBurger}
              onClick={() => {
                setSideBar(true);
              }}
              className='hamBurger w-8 cursor-pointer'
            ></img>
            <div className='Foodie font-bold text-red-600 text-xl cursor-pointer' onClick={() => { navigate('/') }}>Foodie</div>
          </div>
          <div className='rightPart flex gap-2 mr-3'>
            <div className='cart flex cursor-pointer mr-2 hover:bg-gray-200 rounded-full p-2' onClick={() => { navigate('/cart') }}>
              <img
                src={shoppingCartIcon}
                alt='cart'
                className='cart w-7'
              ></img>
              <div className='itemQuantity text-red-600 font-bold'>{getTotalItemCount(cartData)}</div>
            </div>
            {isAuthenticated ? <button className='signUp cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white' onClick={handleLogout}> Logout </button>
              :
              <>
                <button className='signUp cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white hover:bg-red-800 transition-all duration-500' onClick={() => { navigate('/register') }}>
                  Sign Up
                </button>
                <button className='signIn cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white hover:bg-red-800 transition-all duration-500' onClick={() => { navigate('/login') }}>
                  Sign In
                </button>
              </>}

          </div>
        </div>
      </div>

      {/* Desktop View: Displayed after 768px */}
      <div className='Navbar lg:flex hidden justify-between mx-[5%] items-center min-h-16'>
        {/* Desktop content here, can be similar or different from tablet */}
        <div className='Foodie font-bold text-red-600 text-2xl cursor-pointer' onClick={() => { navigate('/') }}>Foodie</div>
        <div className='navContent'>
          <ul className='Content flex gap-[7%] font-medium -ml-32'>
            <li className='navContents cursor-pointer hover:bg-gray-300 transition-all duration-500 rounded-full px-3' onClick={() => { navigate('/products') }}>Menu</li>
            <li className='navContents cursor-pointer hover:bg-gray-300 transition-all duration-500 rounded-full px-3' onClick={() => { navigate('/service') }}>Reserve</li>
            <li className='navContents cursor-pointer hover:bg-gray-300 transition-all duration-500 rounded-full px-3' onClick={() => { navigate('/contact') }}>Contact</li>
            <li className='navContents cursor-pointer hover:bg-gray-300 transition-all duration-500 rounded-full px-1' onClick={() => { navigate('/your/reservations') }}>Reservations</li>
            <li className='orders navContents cursor-pointer hover:bg-gray-300 transition-all duration-500 rounded-full px-1' onClick={() => {navigate('/orders')}}>Orders</li>
          </ul>
        </div>
        <div className='utils flex gap-[8%] font-medium items-center'>
          <div className='cart flex cursor-pointer mr-2 hover:bg-gray-200 rounded-full p-2' onClick={() => { navigate('/cart') }}>
            <img
              src={shoppingCartIcon}
              alt='cart'
              className='cart max-w-7 z-10'
            ></img>
            <div className='itemQuantity text-red-600 font-bold'>{getTotalItemCount(cartData)}</div>
          </div>
          {isAuthenticated ? <button className='signUp cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white hover:bg-red-800 transition-all duration-500' onClick={handleLogout}> Logout </button>
            :
            <>
              <button className='signUp cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white hover:bg-red-800 transition-all duration-500' onClick={() => { navigate('/register') }}>
                Sign Up
              </button>
              <button className='signIn cursor-pointer min-w-fit bg-red-300 p-1 rounded-md text-white hover:bg-red-800 transition-all duration-500' onClick={() => { navigate('/login') }}>
                Sign In
              </button>
            </>}
        </div>
      </div>
    </>
  );
};

export default Navbar;