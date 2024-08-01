import Seat from '../models/seatSchema.js'; // Importing the Seat schema
import jwt from 'jsonwebtoken';

async function freeSeat(req, res) {
  let ultimate_Id;
  
  try {
    const token = req.headers.cookie;
    const filteredToken = token.replace('token=', '');

    // Verify the token
    const decoded = jwt.verify(filteredToken, process.env.JWT_SECRET);
    req.user = decoded;
    const db_user_id = decoded.userId;
    const db_admin_id = decoded.adminId;

    if (db_user_id) {
      ultimate_Id = db_user_id;
    } else if (db_admin_id) {
      ultimate_Id = db_admin_id
    }

    const { id } = req.params; // Assuming seat id is passed in the URL
    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    seat.occupied = true;
    seat.occupiedBy = ultimate_Id; // Clear occupiedBy field
    await seat.save();
    res.status(200).json({ message: 'Seat freed successfully' });
  } catch (error) {
    console.error('Error freeing seat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default freeSeat;
