import Admin from '../models/adminSchema.js';

const register = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ name });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Create a new admin
        const newAdmin = new Admin({
            name,
            password
        });

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default register;
