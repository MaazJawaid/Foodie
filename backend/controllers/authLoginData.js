import jwt from 'jsonwebtoken';
import User from '../models/registerUserSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { email, password, terms } = req.body;

    try {
        // Find the user in the database based on email and password
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If user is found, create a JWT token
        let expiry;
        if (terms) {
            // If terms are accepted, set expiry to 1 month
            
            expiry = '30d';
        } else {
            // If terms are not accepted, set expiry to 6 hours
            expiry = '6h';
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: expiry });
        
        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });
        
        res.status(200).json({ message: 'Login successful', token, user }); // You can customize the response as needed
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { login };
