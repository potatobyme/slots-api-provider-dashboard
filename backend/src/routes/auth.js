const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const crypto = require('crypto');

// Generate secure refresh token
const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex');
};

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            tokenVersion: user.tokenVersion // For invalidating tokens on password change/logout
        },
        process.env.JWT_SECRET,
        { expiresIn: '180d' } // 6 months access token
    );
};

// Register user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user with initial token version
        const user = await User.create({
            username,
            email,
            password,
            balance: 1000,
            tokenVersion: 0,
            refreshToken: generateRefreshToken()
        });

        // Generate tokens
        const accessToken = generateAccessToken(user);

        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(201).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update refresh token and last login
        user.refreshToken = generateRefreshToken();
        user.lastLogin = Date.now();
        await user.save();

        // Generate access token
        const accessToken = generateAccessToken(user);

        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Refresh access token
router.post('/refresh-token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token' });
        }

        // Find user by refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Generate new access token
        const accessToken = generateAccessToken(user);

        res.json({
            success: true,
            accessToken
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

// Logout
router.post('/logout', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Invalidate refresh token
        user.refreshToken = null;
        user.tokenVersion += 1; // Invalidate all existing tokens
        await user.save();

        // Clear refresh token cookie
        res.clearCookie('refreshToken');

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get current user
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                balance: user.balance
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get balance (separate endpoint for sensitive data)
router.get('/balance', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            balance: user.balance
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update balance (separate endpoint for sensitive data)
router.post('/balance', protect, async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.updateBalance(amount);

        res.json({
            success: true,
            balance: user.balance
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 