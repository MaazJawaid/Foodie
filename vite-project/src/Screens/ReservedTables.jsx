import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import smily from '../assets/Reservations/laughing.png'

const ReservedTables = () => {
  const [reservations, setReservations] = useState([]);
  const userData = useSelector(state => state.login.user);
  const email = userData.email;
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get/user/reservations/data', {
        params: { email: email }
      });
      setReservations(response.data);
      console.log(response.data)

    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [email]);

  const handleDelete = async (id) => {
    try {
      await axios.post(`http://localhost:3000/crud/cancel/reservation/${id}`);
      fetchReservations()
      
      console.log(`Seat ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting seat:', error);
    }
  };

  return (
    <div className='page mt-16 sm:mt-0 w-screen flex flex-col items-center bg-gray-200 pb-6'>
      <h1 className="text-2xl font-bold mb-4 mt-4">Your Reservations</h1>
      {reservations.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-y-7">
          <p className="text-lg mb-4">You don't have any booked seats currently.</p>
          <img src={smily} alt='smily picture' className='image w-32'></img>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {navigate('/service')}}>Book a Seat</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map(reservation => (
            <div key={reservation._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
              <p className='data font-semibold'>Name: {reservation.name}</p>
              <p className='data font-semibold'>Email: {reservation.email}</p>
              <p className='data font-semibold'>Time: {reservation.time}</p>
              <p className='data font-semibold'>Phone: {reservation.phone}</p>
              <p className='data font-semibold'>Number of People: {reservation.people}</p>
              <p className='data font-semibold'>Message: {reservation.message}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={() => handleDelete(reservation._id)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservedTables;
