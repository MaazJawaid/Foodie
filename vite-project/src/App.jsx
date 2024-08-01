import React, { useEffect } from 'react';
import Routes from './router/Routes';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { adminLoginSuccess } from './redux/adminSclicer/adminSlice'
import { loginSuccess } from './redux/loginSlicer/loginSlice'
import { setFoodItems } from './redux/foodItemsAllSlicer/foodItemsAllSlice';
import { fetchSeatsStart, fetchSeatsSuccess, fetchSeatsFailure } from './redux/tableSlicer/tableSlice';
import { fetchCartItemById } from './redux/cartSlicer/cartSlicer.js'


axios.defaults.withCredentials = true;

function App() {
  let userData, admin;
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemById({ email: user.email }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/decode', {
          withCredentials: true // Send cookies with the request
        });
        userData = response.data.userData;
        admin = response.data.admin;

        if (admin) {
          userData = { admin: userData }
          dispatch(adminLoginSuccess(userData))
        } else if (!admin) {
          userData = { user: userData }
          dispatch(loginSuccess(userData))
        }

      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Invalid credentials
          console.log(error.response.data.error);
        } else {
          // Other errors
          console.error('Error logging in:', error.message);
        }
      }
    };
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get/food/items/all');
        dispatch(setFoodItems(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    dispatch(fetchSeatsStart());
    try {
      const response = await axios.get('http://localhost:3000/get/table/items/all');
      dispatch(fetchSeatsSuccess(response.data));
    } catch (error) {
      dispatch(fetchSeatsFailure(error.message));
    }
  };
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
