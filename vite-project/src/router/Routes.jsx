import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Product from '../Screens/Product';
import Service from '../Screens/Service';
import Cart from '../Screens/Cart';
import Payment from '../Screens/Payment';
import AdminPanel from '../Screens/AdminPanel';
import SupportPage from '../Screens/SupportPage';
import Navbar from '../components/Navbar';
import Orders from '../Screens/Orders';
import Footer from '../components/Footer/Footer';
import Arriving from '../Screens/Arriving';
import AdminNavbar from '../components/AdminNavbar';
import AddFoodItem from '../Screens/AddFoodItem';
import AdminLogin from '../Screens/AdminLogin'
import EditFoodItem from '../Screens/EditFoodItem';
import InProgressEditing from '../Screens/InProgressEditing'
import AdminCreateReservation from '../Screens/AdminCreateReservation';
import AdminReservation from '../Screens/AdminReservation'
import ReservedTables from '../Screens/ReservedTables';
import AdminManageOrder from '../Screens/AdminManageOrder';

const App = () => {
  const isAdminAuthenticated = useSelector(state => state.admin.isAdminAuthenticated);
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/your/reservations"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ReservedTables />
                <Footer />
              </>) : (
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/service"
          element={
            isAuthenticated ? (<>
              <Navbar />
              <Service />
              <Footer />
            </>) : (
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <SupportPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            isAuthenticated ? (<>
              <Navbar />
              <Payment />
              <Footer />
            </>) : (
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated ? (<>
              <Navbar />
              <Orders />
              <Footer />
            </>) : (
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/arriving"
          element={
            <>
              <Navbar />
              <Arriving />
              <Footer />
            </>
          }
        />
        <Route path="/admin/login" element={
          !isAdminAuthenticated ? (<>
            <AdminNavbar />
            <AdminLogin />
          </>) : (
            <>
              <AdminNavbar />
              <AdminPanel />
            </>
          )
        }
        />
        <Route path="/admin/dashboard" element={
          isAdminAuthenticated ? (<>
            <AdminNavbar />
            <AdminPanel />
          </>) : (
            <>
              <AdminNavbar />
              <AdminLogin />
            </>
          )
        }
        />
        <Route
          path="/admin/additem"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <AddFoodItem />
              </>
            ) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        /><Route
          path="/admin/editItem"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <EditFoodItem />
              </>
            ) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
        <Route
          path="/admin/editItem/inprogress/:id"
          element={
            isAdminAuthenticated ? (
              <>
                <InProgressEditing />
              </>
            ) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
        <Route
          path="/admin/reservation"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <AdminReservation />
              </>
            ) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
        <Route
          path="/admin/create/seat"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <AdminCreateReservation />
              </>
            ) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
        <Route
          path="/admin/client/reservations"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <ReservedTables />
              </>) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
        <Route
          path="/admin/manage/orders"
          element={
            isAdminAuthenticated ? (
              <>
                <AdminNavbar />
                <AdminManageOrder />
              </>) : (
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;