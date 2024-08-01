import Seat from '../models/seatSchema.js'; // Importing the Seat schema

async function freeSeat(req, res) {
  try {
    const { id } = req.params; // Assuming seat id is passed in the URL
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    seat.occupied = false;
    seat.occupiedBy = ''; // Clear occupiedBy field
    await seat.save();
    
    res.status(200).json({ message: 'Seat freed successfully' });
  } catch (error) {
    console.error('Error freeing seat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default freeSeat;
