const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const SlotMachine = require('../models/SlotMachine');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      console.log('ME query called, user:', user?.id);
      if (!user) {
        console.log('No authenticated user found');
        return null;
      }
      
      const foundUser = await User.findById(user.id);
      console.log('Found user:', foundUser);
      return foundUser;
    },
    getApiKeys: async (_, __, { user }) => {
      console.log('Get API keys called for user:', user?.id);
      if (!user) {
        throw new Error('Not authenticated');
      }
      const apiKeys = await ApiKey.find({ userId: user.id });
      return apiKeys.map(key => {
        const keyObj = key.toObject();
        return {
          id: keyObj._id.toString(),
          name: keyObj.name,
          key: keyObj.key,
          status: keyObj.status,
          createdAt: key.createdAt.getTime().toString(),
          lastUsed: keyObj.lastUsed ? keyObj.lastUsed.getTime().toString() : null,
          updatedAt: key.updatedAt.getTime().toString()
        };
      });
    },
    getBalance: async (_, __, { user }) => {
      console.log('Get balance called for user:', user?.id);
      if (!user) {
        throw new Error('Not authenticated');
      }
      const foundUser = await User.findById(user.id);
      return foundUser.balance;
    },
    getBillingCycle: async (_, __, { user }) => {
      console.log('Get billing cycle called for user:', user?.id);
      if (!user) {
        throw new Error('Not authenticated');
      }
      const foundUser = await User.findById(user.id);
      return foundUser.billingCycle;
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
    register: async (_, { input }) => {
      console.log('Register attempt for username:', input.username);
      try {
        const existingUser = await User.findOne({ 
          $or: [
            { username: input.username },
            { email: input.email }
          ]
        });

        if (existingUser) {
          console.log('Registration failed: User already exists');
          return {
            success: false,
            error: 'Username or email already exists'
          };
        }

        const user = new User({
          ...input,
          balance: 1000,
          billingCycle: {
            current: 0,
            limit: 10,
            lastReset: new Date()
          }
        });
        await user.save();
        
        const accessToken = generateAccessToken(user);
        console.log('Registration successful for user:', user.id);
        
        return {
          success: true,
          user,
          accessToken
        };
      } catch (error) {
        console.error('Registration error:', error);
        return {
          success: false,
          error: 'Registration failed'
        };
      }
    },
    login: async (_, { input }, { res }) => {
      console.log('Login attempt for username:', input.username);
      try {
        const user = await User.findOne({ username: input.username });
        
        if (!user || !user.comparePassword(input.password)) {
          console.log('Login failed: Invalid credentials');
          return {
            success: false,
            error: 'Invalid credentials'
          };
        }

        const accessToken = generateAccessToken(user);
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        
        console.log('Login successful for user:', user.id);
        return {
          success: true,
          user,
          accessToken
        };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          error: 'Login failed'
        };
      }
    },
    logout: async (_, __, { req, res, user }) => {
      console.log('Logout attempt for user:', user?.id);
      try {
        if (user) {
          // Increment token version to invalidate all existing tokens
          const userData = await User.findById(user.id);
          userData.tokenVersion += 1;
          await userData.save();
          console.log('Incremented token version for user:', user.id);
        }

        // Clear auth token cookie
        if (res && res.clearCookie) {
          res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
          });
        }
        
        // Clear request user
        if (req) {
          req.user = null;
        }
        
        console.log('Logout successful');
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return false;
      }
    },
    updateBalance: async (_, { input: { amount } }, { user }) => {
      console.log('[Mutation] updateBalance - Attempting balance update:', { 
        userId: user?.id, 
        amount 
      });
      
      if (!user) {
        console.log('[Mutation] updateBalance - Authentication error: No user found');
        throw new Error('Not authenticated');
      }

      try {
        const userData = await User.findById(user.id);
        
        // Update billing cycle first
        await userData.updateBillingCycle(amount);
        
        // Then update balance
        const oldBalance = userData.balance;
        userData.balance += amount;
        await userData.save();

        console.log('[Mutation] updateBalance - Balance updated:', {
          userId: user.id,
          oldBalance,
          newBalance: userData.balance,
          change: amount,
          billingCycle: userData.billingCycle
        });

        return userData.balance;
      } catch (error) {
        console.error('[Mutation] updateBalance - Error:', error.message);
        throw new Error(error.message);
      }
    },
    updateBillingLimit: async (_, { input: { limit } }, { user }) => {
      console.log('[Mutation] updateBillingLimit - Attempting limit update:', {
        userId: user?.id,
        newLimit: limit
      });

      if (!user) {
        console.log('[Mutation] updateBillingLimit - Authentication error: No user found');
        throw new Error('Not authenticated');
      }

      if (user.role !== 'admin') {
        console.log('[Mutation] updateBillingLimit - Authorization error: User is not admin');
        throw new Error('Not authorized');
      }

      try {
        const userData = await User.findById(user.id);
        userData.billingCycle.limit = limit;
        await userData.save();

        console.log('[Mutation] updateBillingLimit - Limit updated:', {
          userId: user.id,
          oldLimit: userData.billingCycle.limit,
          newLimit: limit
        });

        return userData.billingCycle;
      } catch (error) {
        console.error('[Mutation] updateBillingLimit - Error:', error.message);
        throw new Error(error.message);
      }
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
    },
    createApiKey: async (_, { input }, { user }) => {
      console.log('[Mutation] createApiKey - Attempting to create API key:', {
        userId: user?.id,
        keyName: input.name
      });

      if (!user) {
        console.log('[Mutation] createApiKey - Authentication error: No user found');
        return {
          success: false,
          error: 'Not authenticated'
        };
      }

      try {
        const apiKey = new ApiKey({
          userId: user.id,
          name: input.name,
          key: ApiKey.generateApiKey(),
          status: 'active'
        });

        await apiKey.save();

        console.log('[Mutation] createApiKey - API key created successfully:', {
          userId: user.id,
          keyId: apiKey.id
        });

        const apiKeyObj = apiKey.toObject();
        return {
          success: true,
          apiKey: {
            id: apiKeyObj._id.toString(),
            name: apiKeyObj.name,
            key: apiKeyObj.key,
            status: apiKeyObj.status,
            createdAt: apiKey.createdAt.getTime().toString(),
            lastUsed: apiKeyObj.lastUsed ? apiKeyObj.lastUsed.getTime().toString() : null,
            updatedAt: apiKey.updatedAt.getTime().toString()
          }
        };
      } catch (error) {
        console.error('[Mutation] createApiKey - Error:', error.message);
        return {
          success: false,
          error: 'Failed to create API key'
        };
      }
    },
    deleteApiKey: async (_, { id }, { user }) => {
      console.log('[Mutation] deleteApiKey - Attempting to delete API key:', {
        userId: user?.id,
        keyId: id
      });

      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const apiKey = await ApiKey.findOne({ _id: id, userId: user.id });
        if (!apiKey) {
          throw new Error('API key not found');
        }

        await apiKey.deleteOne();
        return true;
      } catch (error) {
        console.error('[Mutation] deleteApiKey - Error:', error.message);
        return false;
      }
    },
    toggleApiKeyStatus: async (_, { id }, { user }) => {
      console.log('[Mutation] toggleApiKeyStatus - Attempting to toggle API key status:', {
        userId: user?.id,
        keyId: id
      });

      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const apiKey = await ApiKey.findOne({ _id: id, userId: user.id });
        if (!apiKey) {
          throw new Error('API key not found');
        }

        apiKey.status = apiKey.status === 'active' ? 'disabled' : 'active';
        await apiKey.save();

        return apiKey;
      } catch (error) {
        console.error('[Mutation] toggleApiKeyStatus - Error:', error.message);
        throw error;
      }
    },
  }
};

module.exports = resolvers; 