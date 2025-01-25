const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex');
};

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            balance: user.balance,
            tokenVersion: user.tokenVersion
        },
        process.env.JWT_SECRET,
        { expiresIn: '180d' } // 6 months access token
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};

const authMiddleware = async (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return { user: null };

    const decoded = verifyToken(token);
    if (!decoded) return { user: null };

    return { user: decoded };
};

module.exports = {
    generateRefreshToken,
    generateAccessToken,
    verifyToken,
    authMiddleware
}; 