import React, { useState } from 'react';
import Image from '../assets/Service/table.jpg'
import axios from 'axios'; // Import Axios
import { useSelector } from 'react-redux';
import useFetchSeats  from '../helperFunctions/seatsRefreshRedux.js'

const Service = () => {
  let name, value;
  const fetchSeats = useFetchSeats();
  const seats = useSelector(state => state.table.seats);
  const loading = useSelector(state => state.table.loading);
  const [nameError, setnameError] = useState(false)
  const [timeError, settimeError] = useState(false)
  const user = useSelector(state => state.login.user)

  const [reservationForm, setReservationForm] = useState({
    date: '', time: '', people: '', email: user.email, name: '', phone: '', message: '', seatId: ''
  })

  const handleInputChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    // Clear the name error if the input length is greater than or equal to 3
    if (name === 'name' && value.length >= 3) {
      setnameError(false);
    }

    if (name === 'time') {
      const selectedTime = new Date();
      const [hours, minutes] = value.split(':').map(Number);
      selectedTime.setHours(hours);
      selectedTime.setMinutes(minutes);

      // Clear the time error if the selected time is greater than the current time
      if (selectedTime > new Date()) {
        settimeError(false);
      }
    }

    // Update reservationForm with the selected seat IDs
    if (name === 'people') {
      const selectedSeat = seats.find(seat => seat.number === parseInt(value));
      if (selectedSeat) {
        setReservationForm({ ...reservationForm, [name]: value, seatIds: [selectedSeat._id] });
      } else {
        setReservationForm({ ...reservationForm, [name]: value, seatIds: [] }); // Clear seatIds if no seat is selected
      }
    } else {
      setReservationForm({ ...reservationForm, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (reservationForm.name.length < 3) {
      setnameError(true)
      return;
    }

    // Convert reservation time to Date object
    const [reservationHour, reservationMinute] = reservationForm.time.split(':');
    const reservationDateTime = new Date();
    reservationDateTime.setHours(parseInt(reservationHour));
    reservationDateTime.setMinutes(parseInt(reservationMinute));

    // Convert current time to Date object
    const currentDateTime = new Date();

    // Compare selected time with current time
    if (reservationDateTime < currentDateTime) {
      settimeError(true);
      return;
    }

    try {
      // Send the form data using Axios
      const response = await axios.post('http://localhost:3000/crud/book/reservation', reservationForm, {
        withCredentials: true, // Send cookies
      });

      try {
        // Send the form data using Axios
        const new_response = await axios.post(`http://localhost:3000/crud/occupySeat/${reservationForm.seatIds[0]}`, null, {
          withCredentials: true, // Send cookies
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }

      fetchSeats()
      
      // Clear the form after successful submission
      setReservationForm({
        date: '',
        time: '',
        people: '',
        email: '',
        name: '',
        phone: '',
        message: '',
        seatId: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='supportPage flex sm:gap-4 sm:mt-0 mt-16 justify-center sm:justify-between px-12 items-center pb-5 bg-gray-200 w-screen'>
      <img src={Image} className='image sm:h-96 h-44 rounded-xl mt-5 sm:mt-0' alt="Chat"></img>
      <div className='form h-fit outline outline-1 outline-gray-400 rounded-lg sm:w-fit mt-5'>
        <section className="bg-white dark:bg-gray-900 sm:w-fit w-[90vw]">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Reserve a Table</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Want some good Time? Dont wait lets book a Table right now.</p>
            {loading ? ( // Display loader if loading state is true
              <div className="loader">Loading...</div>
            ) : (
              <form action="#" className="space-y-8">
                <div>
                  <div className="firstContainer flex flex-wrap gap-x-2 items-center justify-center sm:justify-normal gap-y-3 mb-3">
                    <div className='dateDiv outline outline-1 outline-gray-400 w-fit px-2 py-1 rounded-lg bg-gray-50 mb-3 mx-auto'>
                      <label htmlFor="datePicker" className='date mr-3'>Time</label>
                      <input type="time" onChange={handleInputChange} name='time' value={reservationForm.time} required />
                      {timeError ? <div className='nameError text-red-500 text-sm mt-2'>Time should be greater than current Time..</div> : <div></div>}
                    </div>
                    <div className='dateDiv outline outline-1 outline-gray-400 w-fit px-2 py-1 rounded-lg mb-3 mx-auto'>
                      <label htmlFor="datePicker" className='date mr-3'>People</label>
                      <select onChange={handleInputChange} name='people' value={reservationForm.people} className='peopleInput outline outline-1 outline-gray-400 rounded-xl' required>
                        <option value="">Select an option</option>
                        {seats
                          .filter(seat => !seat.occupied)
                          .sort((a, b) => a.number - b.number) // Sort seats in ascending order by number
                          .map((seat, index) => (
                            <option key={index} value={seat.number}>{seat.number}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input type="email" id="email" value={reservationForm.email} onChange={handleInputChange} name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                  <input type="text" id="name" value={reservationForm.name} onChange={handleInputChange} name='name' className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="John Doe" required />
                  {nameError ? <div className='nameError text-red-500 text-sm mt-2'>Name must be at least 3 characters long.</div> : <div></div>}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Phone Number</label>
                  <input type="tel" id="phone" onChange={handleInputChange} name='phone' value={reservationForm.phone}
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="123-456-7890" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message (Optional)</label>
                  <textarea id="message" rows="6" name='message' value={reservationForm.message} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" onClick={handleSubmit} className="py-3 px-5 text-sm font-medium text-center rounded-lg bg-red-400 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-black">Book Now</button>
              </form>)}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Service
