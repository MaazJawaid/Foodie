import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js';
import User from '../models/registerUserSchema.js';

const authenticateToken = async (req, res, next) => {
    let ultimate_Id;
    // Get the token from the request headers or cookies
    const token = req.headers.cookie;
    const filteredToken = token ? token.replace('token=', '') : null;

    if (!filteredToken) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(filteredToken, process.env.JWT_SECRET);
        req.user = decoded;
        const db_user_id = decoded.userId;
        const db_admin_id = decoded.adminId;

        if (db_user_id) {
            ultimate_Id = db_user_id;
        } else if (db_admin_id) {
            ultimate_Id = db_admin_id
        }

        // Check token expiry
        if (decoded.exp <= Date.now() / 1000) {
            // Token expired, clear cookie
            res.clearCookie('token');
            return res.status(401).json({ error: 'Token expired, login again' });
        }

        // Search for the token in the database
        const userRecord = await Admin.findOne({ _id: ultimate_Id });
        if (userRecord) {
            // Token found in admins collection, user is an admin

            req.admin = true;
            req.userData = userRecord;
        } else {
            // Token not found in admins collection, check Foodie database for other collections
            const otherRecord = await User.findOne({ _id: ultimate_Id });
            if (otherRecord) {
                req.admin = false; // User is not an admin
                req.userData = otherRecord;
            } else {
                return res.status(403).json({ error: 'Invalid token' });
            }
        }

        // Respond with the record and admin value
        res.status(200).json({ userData: req.userData, admin: req.admin });
    } catch (err) {
        console.error('Error authenticating token:', err);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export default authenticateToken;
