const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex');
};

const generateAccessToken = (user) => {
    console.log('[Auth] Generating access token for user:', user.id);
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            balance: user.balance
        },
        process.env.JWT_SECRET,
        { expiresIn: '180d' }
    );
    console.log('[Auth] Access token generated successfully');
    return token;
};

const verifyToken = (token) => {
    console.log('[Auth] Verifying token');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('[Auth] Token verified successfully for user:', decoded.id);
        return decoded;
    } catch (error) {
        console.error('[Auth] Token verification failed:', error.message);
        return null;
    }
};

const authMiddleware = async (req) => {
    console.log('[Auth] Processing authentication middleware');
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        console.log('[Auth] No token found in request');
        return { user: null };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        console.log('[Auth] Invalid or expired token');
        return { user: null };
    }

    console.log('[Auth] User authenticated:', decoded.id);
    return { user: decoded };
};

module.exports = {
    generateRefreshToken,
    generateAccessToken,
    verifyToken,
    authMiddleware
}; 