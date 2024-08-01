const logout = (req, res) => {
    // Get the token from the request headers or cookies
    const token = req.headers.cookie;
    const filteredToken = token.replace('token=', '');

    if (!filteredToken) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

export default logout;
