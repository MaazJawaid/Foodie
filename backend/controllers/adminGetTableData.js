import Seat from '../models/seatSchema.js';

const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Error fetching seats' });
  }
};

export default getSeats;
