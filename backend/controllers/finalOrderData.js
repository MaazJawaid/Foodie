import Order from '../models/orderData.js';
import CartItem from '../models/cartItemSchema.js';

const addOrder = async (req, res) => {
    try {
        const { email, date, time, orderData, subTotal, state } = req.body;

        // Check for existing order based on email and orderData
        const occurrence = await Order.findOne({ email, orderData, subTotal });
        if (occurrence) {
            return res.status(400).json({ message: 'Order already exists for the given data.' });
        }

        // Create a new order
        const newOrder = new Order({
            email, date, time, orderData, subTotal, state
        });

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        // Delete all cart items for the user
        await CartItem.deleteMany({ userId: email });

        res.status(201).json({ message: 'Order saved successfully.', order: savedOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


export default addOrder;
