import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateSeatForm = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [occupied, setOccupied] = useState(false);
  const [occupiedBy, setOccupiedBy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/crud/admin/createseat', {
        number,
        occupied,
        occupiedBy
      });
      // Handle success, maybe show a success message
      console.log('Seat created successfully');
      
      setNumber('')
      setOccupied('')
      setOccupiedBy('')
      navigate('/admin/reservation')
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Error creating seat:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-white">
      <h1 className="text-2xl font-bold mb-4">Create New Seat</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm shadow-xl p-3 rounded-lg bg-gray-200">
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700 font-bold mb-2">Number of Chairs</label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="occupied" className="block text-gray-700 font-bold mb-2">Occupied</label>
          <select
            id="occupied"
            value={occupied}
            onChange={(e) => setOccupied(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value={true}>Occupied</option>
            <option value={false}>Not Occupied</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="occupiedBy" className="block text-gray-700 font-bold mb-2">Occupied By</label>
          <input
            type="text"
            id="occupiedBy"
            value={occupiedBy}
            onChange={(e) => setOccupiedBy(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Seat
        </button>
      </form>
    </div>
  );
};

export default CreateSeatForm;
