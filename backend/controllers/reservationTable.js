import Reservation from '../models/reservationTableRequest.js';

const saveReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send('Reservation saved successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default saveReservation ;
