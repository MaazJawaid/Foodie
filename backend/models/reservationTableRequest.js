import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    date: Date,
    time: String,
    people: Number,
    email: String,
    name: String,
    phone: String,
    message: String,
    seatIds: [String]
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
