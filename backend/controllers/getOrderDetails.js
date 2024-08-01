import orderData from "../models/orderData.js";

const findAllOrder = async (req, res) => {
    const { email } = req.query;

    try {
        // Check if email is provided
        if (!email) {
            return res.status(400).send('Email query parameter is required');
        }

        // Fetch orders from the database
        const orderItemData = await orderData.find({ email });

        // If no orders are found
        if (orderItemData.length === 0) {
            return res.status(404).send('Order not found');
        }

        // Send found orders
        return res.status(200).json({ orderItemData });
    } catch (error) {
        // Return error details
        return res.status(500).send(`Error: ${error.message}`);
    }
}

export default findAllOrder;
