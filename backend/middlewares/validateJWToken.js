import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    // Get the token from the request headers or cookies
    const token = req.headers.cookie;
    const filteredToken = token.replace('token=', '');

    if (!filteredToken) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(filteredToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error authenticating token:', err);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export default authenticateToken;
