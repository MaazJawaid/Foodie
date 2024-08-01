import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSeatsStart, fetchSeatsSuccess, fetchSeatsFailure } from '../redux/tableSlicer/tableSlice';
import './AdminReservation.css'

const ReservationPage = () => {
    const navigate = useNavigate();
    const [filterOccupied, setFilterOccupied] = useState(false);
    const seats = useSelector(state => state.table.seats);
    const loading = useSelector(state => state.table.loading);
    const dispatch = useDispatch();
    const [userData, setuserData] = useState(false)
    const [userDataInfo, setUserDataInfo] = useState(null);


    const handleFilterChange = (e) => {
        setFilterOccupied(e.target.checked);
    };

    const fetchSeats = async () => {
        dispatch(fetchSeatsStart());
        try {
            const response = await axios.get('http://localhost:3000/get/table/items/all');
            dispatch(fetchSeatsSuccess(response.data));
        } catch (error) {
            dispatch(fetchSeatsFailure(error.message));
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/crud/admin/deleteitem/table/${id}`);
            fetchSeats(); // Refresh the seats after deletion
            console.log(`Seat ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting seat:', error);
        }
    };

    const handleFreeTable = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3000/crud/admin/freeSeat/${id}`); // Assuming you have access to seatId            
            console.log('Seat freed successfully');

            // Update UI or fetch seat data again
            await fetchSeats();

            try {
                await axios.post(`http://localhost:3000/crud/admin/delete/reservation/${id}`); // Assuming you have access to seatId
                setUserDataInfo(null);
                setuserData(false)

            } catch (error) {
                console.error('Error Deleting Reservataion:', error);
            }
        } catch (error) {
            console.error('Error freeing seat:', error);
        }
    };

    // Function to fetch user data
    const fetchUserData = async (id) => {
        try {
            // Assuming there's an endpoint to fetch user data based on email
            const response = await axios.get(`http://localhost:3000/get/reservations/item/${id}`);
            setUserDataInfo(response.data); // Set user data to state
            setuserData(true)

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 text-size">
            <h1 className="text-2xl font-bold my-4">Reservations</h1>
            <div className="my-4">
                <label htmlFor="filter" className="font-bold mr-2">Show:</label>
                <input
                    type="checkbox"
                    id="filter"
                    checked={filterOccupied}
                    onChange={handleFilterChange}
                    className="mr-2"
                />
                <label htmlFor="filter" className="font-bold">Occupied</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 block w-full" onClick={() => { navigate('/admin/create/seat') }}>
                Add New Seat
            </button>
            <div className="overflow-x-auto overflow-y-auto max-h-[45vh]">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Seat Number</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Occupied By</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seats.map(seat => (
                            (filterOccupied ? seat.occupied : true) && // Filter by occupied status
                            <tr key={seat._id}>
                                <td className="border px-4 py-2">{seat.number}</td>
                                <td className="border px-4 py-2 flex justify-center">{seat.occupied ? <button onClick={() => handleFreeTable(seat._id)} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" > Free</button>
                                    : 'Not Occupied'}</td>
                                <td className="border px-4 py-2 cursor-pointer" onClick={() => { fetchUserData(seat._id) }}>{seat.occupiedBy}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleDelete(seat._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2" > Delete </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Conditional rendering for user data */}
            {console.log(userDataInfo)}
            {userDataInfo && userData && (
                <div className="container w-full flex flex-col items-center">
                    <h1 className="text-center my-4 text-xl font-bold">Reservation List</h1>
                    <div className="row">
                        {userDataInfo.Reservations.map(reservation => (
                            <div key={reservation._id} className="col-lg-6 mx-auto mb-4">
                                <div className="card">
                                    <div className="card-body bg-gray-200 p-2 rounded-xl">
                                        <p><strong>Name:</strong> {reservation.name}</p>
                                        <p><strong>Email:</strong> {reservation.email}</p>
                                        <p><strong>Phone:</strong> {reservation.phone}</p>
                                        <p><strong>Time:</strong> {reservation.time}</p>
                                        <p><strong>People:</strong> {reservation.people}</p>
                                        <p><strong>Message:</strong> {reservation.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationPage;
