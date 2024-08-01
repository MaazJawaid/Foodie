import FoodItem from '../models/foodItemSchema.js'; // Assuming this is the path to your FoodItem model

const getAllFoodItems = async (req, res) => {
    try {
        // Find all food items in the database
        const foodItems = await FoodItem.find();
        
        // Check if there are no food items found
        if (!foodItems) {
            return res.status(404).json({ error: 'No food items found' });
        }

        // Respond with the food items
        res.status(200).json({ foodItems });
    } catch (err) {
        console.error('Error retrieving food items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default getAllFoodItems;