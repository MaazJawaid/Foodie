import Reservation from '../models/reservationTableRequest.js';

const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.deleteMany({ seatIds: id });

        if (!reservation) {
            return res.status(404).send('Reservation not found.');
        }

        res.status(200).send('Reservation deleted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default deleteReservation;
