import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { name, password } = req.body;
    const prevToken = req.headers.cookie ? req.headers.cookie.replace('token=', '') : null;

    if (prevToken) {
        res.clearCookie('token');
    }

    try {
        // Find the admin in the database based on name and password
        const admin = await Admin.findOne({ name: name, password: password });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful', token, admin }); // You can customize the response as needed
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default login;
