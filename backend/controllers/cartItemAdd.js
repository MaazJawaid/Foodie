import CartItem from "../models/cartItemSchema.js";

const saveCartItem = async (req, res) => {
    try {
        const { item_id, email, quantity } = req.body;

        // Find existing cart item
        let cartItem = await CartItem.findOne({ itemId: item_id, userId: email });

        if (cartItem) {
            // If cart item exists, update quantity by incrementing it
            cartItem.quantity += 1;
        } else {
            // If cart item doesn't exist, create a new one
            cartItem = new CartItem({ itemId: item_id, userId: email, quantity: 1 });
        }

        // Save the updated or new cart item
        await cartItem.save();

        res.status(201).send('Cart Item saved successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default saveCartItem;
