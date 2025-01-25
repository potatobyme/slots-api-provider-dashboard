const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SlotMachine = require('../models/SlotMachine');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) return null;
      return await User.findById(user.id);
    },
    getBalance: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const userData = await User.findById(user.id);
      return userData.balance;
    },
    getSlots: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await SlotMachine.find();
    },
    getSlot: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await SlotMachine.findById(id);
    },
    getSlotStats: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const slot = await SlotMachine.findById(id);
      return slot.metrics;
    },
  },
  Mutation: {
    register: async (_, { input: { username, email, password } }, { res }) => {
      try {
        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
          return {
            success: false,
            error: 'User already exists'
          };
        }

        // Create user
        const user = await User.create({
          username,
          email,
          password,
          balance: 1000,
          tokenVersion: 0,
          refreshToken: generateRefreshToken()
        });

        // Generate token
        const accessToken = generateAccessToken(user);

        // Set refresh token cookie
        res.cookie('refreshToken', user.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return {
          success: true,
          accessToken,
          user
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    login: async (_, { input: { email, password } }, { res }) => {
      try {
        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          return {
            success: false,
            error: 'Invalid credentials'
          };
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return {
            success: false,
            error: 'Invalid credentials'
          };
        }

        // Update refresh token and last login
        user.refreshToken = generateRefreshToken();
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const accessToken = generateAccessToken(user);

        // Set refresh token cookie
        res.cookie('refreshToken', user.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return {
          success: true,
          accessToken,
          user
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    logout: async (_, __, { user, res }) => {
      if (!user) return false;

      try {
        const userData = await User.findById(user.id);
        if (!userData) return false;

        // Invalidate refresh token
        userData.refreshToken = null;
        userData.tokenVersion += 1;
        await userData.save();

        // Clear refresh token cookie
        res.clearCookie('refreshToken');

        return true;
      } catch (error) {
        return false;
      }
    },
    updateBalance: async (_, { input: { amount } }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const userData = await User.findById(user.id);
      await userData.updateBalance(amount);
      return userData.balance;
    },
    createSlot: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      if (user.role !== 'admin') throw new Error('Not authorized');

      return await SlotMachine.create({
        ...input,
        status: 'active',
        metrics: {
          totalBets: 0,
          totalWins: 0,
          rtp: 0,
          hitFrequency: 0,
          maxWin: 0
        }
      });
    },
    updateSlotMetrics: async (_, { id, input: { bet, win } }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const slot = await SlotMachine.findById(id);
      if (!slot) throw new Error('Slot machine not found');

      const metrics = slot.metrics;
      metrics.totalBets += 1;
      metrics.totalWins += win > 0 ? 1 : 0;
      metrics.rtp = (metrics.totalWins / metrics.totalBets) * 100;
      metrics.hitFrequency = (metrics.totalWins / metrics.totalBets) * 100;
      metrics.maxWin = Math.max(metrics.maxWin, win);

      slot.metrics = metrics;
      await slot.save();

      return slot.metrics;
    }
  }
};

module.exports = resolvers; 