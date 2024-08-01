import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    orderData: {
        type: Schema.Types.Mixed,  // Correct usage of Mixed type
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

export default mongoose.model('Order', orderSchema);
