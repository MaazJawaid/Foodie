import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  occupied: {
    type: Boolean,
    default: false
  },
  occupiedBy: {
    type: String,
    default: ''
  }
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
