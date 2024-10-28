const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    // Remove 'Bearer ' from the token string if it exists
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach decoded user id to request
        next();
    } catch (err) {
        console.log("JWT Verification Error:", err); // Debugging info
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
