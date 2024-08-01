import User from '../models/registerUserSchema.js';

const save = async (req, res) => {
    const { email, password, name, terms } = req.body;
    console.log(req.body)

    try {
        // Create a new User instance
        const newUser = new User({
            email,
            password,
            name,
            terms
        });

        // Save the User to the database
        const savedUser = await newUser.save();

        res.status(201).json('Data Saved Successfully'); // Send the saved User back as a response
    } catch (err) {
        console.error('Error saving User:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { save };
