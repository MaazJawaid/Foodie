import multer from 'multer';
import path from 'path';
import FoodItem from '../models/foodItemSchema.js';

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

// Controller function for adding a new food item
const addFoodItem = async (req, res) => {
    const {
        name,
        price,
        rating,
        reviews,
        description,
        type,
        onSale,
        discount,
        discountPeriod,
        discountedPrice,
        quantityType,
        quantityUnit,
        discountValidUntil 
    } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
        const foodItem = new FoodItem({
            name,
            price,
            rating,
            reviews,
            description,
            type,
            onSale,
            discount,
            discountPeriod,
            discountedPrice,
            imageUrl,
            quantityType,
            quantityUnit,
            discountValidUntil 
        });

        await foodItem.save();
        console.log('Food item saved to MongoDB');
        res.status(200).json({ message: 'Food item added successfully' });
    } catch (err) {
        console.error('Error saving food item:', err);
        res.status(500).json({ error: 'Error saving food item' });
    }
};

const uploadMiddleware = upload.single('image');

export { addFoodItem, uploadMiddleware };