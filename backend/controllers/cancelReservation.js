import Reservation from '../models/reservationTableRequest.js';

const cancelReservation = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).send('Reservation not found.');
        }

        res.status(200).send('Reservation deleted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default cancelReservation;
