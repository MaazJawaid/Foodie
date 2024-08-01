import FoodItem from '../models/foodItemSchema.js';

const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the id is passed as a URL parameter
        
        // Find the food item by id and delete it
        const deletedFoodItem = await FoodItem.findByIdAndDelete(id);
        
        // Check if the food item was found and deleted
        if (!deletedFoodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (err) {
        console.error('Error deleting food item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default deleteFoodItem;
