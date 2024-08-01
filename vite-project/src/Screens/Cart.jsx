import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { fetchCartItemById } from '../redux/cartSlicer/cartSlicer';
import hungryImage from '../../src/assets/hungry.jpg'

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.cartItem);
  const data = useSelector(state => state.menu.setCategoryBasedItems_1);
  const imageUrls = useSelector(state => state.menu.setImageUrls_1)
  const user = useSelector(state => state.login.user)
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [reason, setReason] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const getCartQuantity = (itemId) => {
    if (cartData) {
      const cartItem = cartData.find(item => item.itemId === itemId);
      return cartItem ? cartItem.quantity : 0;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false); // Hide the alert after 1 second
    }, 2000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  // Filter data based on the cart quantity
  const updateFilteredData = () => {
    const newFilteredData = data.filter(item => getCartQuantity(item._id) >= 1);
    setFilteredData(newFilteredData);
  };

  // Initial load of filtered data
  useEffect(() => {
    updateFilteredData();
  }, [data, cartData]); // Runs once when the component mounts and whenever data or cartData changes

  // Update filtered data when the reason state changes
  useEffect(() => {
    updateFilteredData();
  }, [reason]); // Runs whenever the reason state changes

  const updateCartData = async (item_id, operation) => {

    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    const email = user.email

    if (email && item_id && operation) {
      const updateItem = async (item_id, operation) => {
        try {
          const response = await axios.post('http://localhost:3000/crud/update/cart/item', {
            item_id,
            email,
            operation
          })
          setReason(response.data)
          setShowAlert(true)
          dispatch(fetchCartItemById({ email: email }));

          return response.data
        } catch (error) {
          console.error('Error saving cart item:', error.message);
          throw error;
        }
      }
      updateItem(item_id, operation)
    }
  };

  const showingAlert = () => {
    if (showAlert) {
      return `left-3`
    } else {
      return `-left-[450px]`
    }
  }
  const checkoutSubtotal = () => {
    if (filteredData.length > 0) {
      let subTotalAmount = 0;
      filteredData.forEach(element => {
        const price = element.price
        const quantity = getCartQuantity(element._id)
        subTotalAmount += price * quantity
      });
      return subTotalAmount
    }
  };

  function getFormattedDateTime() {
    const now = new Date();

    // Get the date components
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year

    // Get the time components
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = String(hours).padStart(2, '0');

    // Combine date and time
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${strHours}:${minutes}:${seconds} ${ampm}`;

    return [formattedDate, formattedTime];
  }

  const createOrder = async () => {
    const email = user.email;
    const subTotal = checkoutSubtotal()
    const state = 'created'
    const [date, time] = getFormattedDateTime();
    var orderData = []

    filteredData.forEach(element => {
      var partialElement = {
        item_id: element._id,
        item_name: element.name,
        itemQuantity: getCartQuantity(element._id),
        itemPrice: element.price
      }
      orderData.push(partialElement)
    });
    try {
      const response = await axios.post('http://localhost:3000/crud/create/order', {
        email, subTotal, state, date, time, orderData
      });
      updateFilteredData()
      setReason(response.data.message);  // Extract message here
      dispatch(fetchCartItemById({ email: email }));
      setShowAlert(true)
      navigate('/orders')
    } catch (error) {
      console.error('Error saving cart item:', error);
      setReason('Order already exists');
      setShowAlert(true)
    }
  };

  return (
    <div className="h-fit bg-gray-100 pt-20">
      <div className="w-full flex justify-center">
        <div className={`fixed sm:top-2 top-4 ${showingAlert()} transition-all duration-500 z-50 bg-blue-300 sm:px-20 sm:py-2 px-10 py-1 text-lg rounded-md sm:text-xl`}>{reason}</div>
      </div>
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {filteredData.length > 0 ? filteredData.map(item => (
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <div className="abc sm:w-3/4">
                <img
                  src={imageUrls[item._id]} // Adjust the image URL based on your storage path
                  alt={item.name}
                  className="rounded-lg sm:h-48 h-40 w-full object-cover"
                />
              </div>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-xs text-gray-700">{item.quantityType} - {item.quantityUnit}</p>
                  <p className='mt-2'>{item.description}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => { updateCartData(item._id, 'sub') }}> - </span>
                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={getCartQuantity(item._id)} min="1" readOnly />
                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => { updateCartData(item._id, 'add') }}> + </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm min-w-fit">{item.discountedPrice ? item.discountedPrice : item.price} Rs</p>
                    <div className="hover:cursor-pointer hover:bg-slate-400 transition-all duration-500 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => { updateCartData(item._id, 'delete') }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='font-semibold text-xl'>Hungry? Grab something to eat!</h1>
            <img src={hungryImage} className='rounded-xl sm:w-2/5'></img>
          </div>}
        </div>
        {/* <!-- Sub total --> */}
        {filteredData.length > 0 ? <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sm:sticky sm:top-16 sm:mb-6">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{checkoutSubtotal()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">0</p>
          </div>
          <hr className="my-4" />
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700 w-2/5 sm:w-1/2 font-bold">Name</p>
            <p className="text-gray-700 font-bold">Quantity</p>
            <p className="text-gray-700 font-bold">Price</p>
          </div>
          {filteredData ? filteredData.map(item => (
            <div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700 w-2/5 sm:w-1/2">{item.name}</p>
                <p className="text-gray-700">{getCartQuantity(item._id)}</p>
                <p className="text-gray-700">{item.price}</p>
              </div>
            </div>)) : <div>Kindly, Grab something to eat first!</div>}
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="flex flex-col items-end">
              <p className="mb-1 text-lg font-bold">{checkoutSubtotal() + 0}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => { createOrder() }}>Check out</button>
        </div> : <></>}
      </div>
    </div>
  );
};

export default Cart;
