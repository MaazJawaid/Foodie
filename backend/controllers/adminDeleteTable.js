import Seat from '../models/seatSchema.js';

const deleteSeat = async (req, res) => {
  console.log('hit')
  const { id } = req.params;
  try {
    const seat = await Seat.findByIdAndDelete(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    res.json({ message: 'Seat deleted successfully' });
  } catch (error) {
    console.error('Error deleting seat:', error);
    res.status(500).json({ error: 'Error deleting seat' });
  }
};

export default deleteSeat;
