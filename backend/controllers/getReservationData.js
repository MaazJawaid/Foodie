import Reservation from '../models/reservationTableRequest.js'; // Assuming this is the path to your Reservation model

const getAllReservations = async (req, res) => {
    try {
        const { id } = req.params;

        // Find all food items in the database
        const Reservations = await Reservation.find({ seatIds: id });

        // Check if there are no food items found
        if (!Reservations) {
            return res.status(404).json({ error: 'No Reservations found' });
        }

        // Respond with the food items
        res.status(200).json({ Reservations });
    } catch (err) {
        console.error('Error retrieving food items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default getAllReservations;