import orderData from "../models/orderData.js";

const updateStatus = async (req, res) => {
    const { id } = req.query; // Extract 'id' from query parameters

    try {
        // Use $set to specify the field to update
        const updatedItem = await orderData.findByIdAndUpdate(id, { $set: { state: 'fulfilled' } }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Data updated successfully', data: updatedItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default updateStatus;
