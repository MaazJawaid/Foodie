import CartItem from "../models/cartItemSchema.js";

const findAllCartItemByEmail = async (req, res) => {
    try {
        const { email } = req.query; // Assuming you meant item_id here
        const cartItem = await CartItem.find({ userId: email });

        // Check if cartItem is null or undefined
        if (!cartItem) {
            return res.status(404).send('Cart Item not found.');
        }

        // If cartItem is found, you can send a specific message
        res.status(200).json({ message: 'Cart Item found!', cartItem });
    } catch (error) {
        res.status(400).send(error);
    }
};

export default findAllCartItemByEmail;
