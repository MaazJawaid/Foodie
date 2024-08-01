import Seat from '../models/seatSchema.js'; // Importing the Seat schema

// Controller function to create a new seat
const createSeat = async (req, res) => {
  try {
    const { number, occupied, occupiedBy } = req.body; // Assuming the request body contains the seat data
    const newSeat = new Seat({ number, occupied, occupiedBy }); // Creating a new Seat instance
    await newSeat.save(); // Saving the new seat to the database
    res.status(201).json(newSeat); // Sending a success response with the created seat data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending an error response if something goes wrong
  }
};

export default createSeat;
