import FoodItem from '../models/foodItemSchema.js';

const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the id is passed as a URL parameter
        const updatedFields = req.body; // Assuming updatedFields contains the fields to update
        
        // Find the food item by id and update it with the new fields
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, updatedFields, { new: true });
        
        // Check if the food item was found and updated
        if (!updatedFoodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        // Respond with the updated food item
        res.status(200).json({ message: 'Food item updated successfully', updatedFoodItem });
    } catch (err) {
        console.error('Error updating food item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default updateFoodItem;
