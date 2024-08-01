import CartItem from "../models/cartItemSchema.js";

const editItem = async (req, res) => {
    try {
        const { item_id, email, operation } = req.body;

        // Find the cart item
        const updateItem = await CartItem.findOne({ itemId: item_id, userId: email });

        let reason;
        if (updateItem) {
            if (operation === 'add') {
                updateItem.quantity += 1;
                reason = 'Cart Item Incremented.';
            } else if (operation === 'sub') {
                if (updateItem.quantity > 1) {
                    updateItem.quantity -= 1;
                    reason = 'Cart Item Decremented.';
                } else {
                    // Handle case where quantity would go below 1
                    reason = 'Cannot decrement below 1. Item not removed.';
                }
            } else if (operation === 'delete') {
                await CartItem.deleteOne({ itemId: item_id, userId: email });
                return res.status(200).send('Cart Item Deleted.');
            } else {
                return res.status(400).send('Invalid operation.');
            }

            await updateItem.save();
            res.status(200).send(reason);
        } else {
            res.status(404).send('Item not found in the cart.');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default editItem;
