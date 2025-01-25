const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        // 1) Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'Not authorized to access this route' });
        }

        try {
            // 2) Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3) Check if user still exists
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: 'User no longer exists' });
            }

            // 4) Check if token version matches (for invalidating tokens)
            if (user.tokenVersion !== decoded.tokenVersion) {
                return res.status(401).json({ error: 'Token is no longer valid' });
            }

            // 5) Check if user changed password after token was issued
            if (user.changedPasswordAfter(decoded.iat)) {
                return res.status(401).json({ error: 'User recently changed password. Please log in again' });
            }

            // Grant access to protected route
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token has expired' });
            }
            return res.status(401).json({ error: 'Not authorized to access this route' });
        }
    } catch (error) {
        next(error);
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
}; 