const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const SlotMachine = require('../models/SlotMachine');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await User.findById(user.id);
    },
    getApiKeys: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await ApiKey.find({ user: user.id });
    },
    getBalance: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const userDoc = await User.findById(user.id);
      return userDoc.balance;
    },
    getBillingCycle: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const userDoc = await User.findById(user.id);
      await userDoc.checkAndResetBillingCycle(); // Check and reset if needed
      return {
        current: userDoc.billingCycle.current,
        limit: userDoc.billingCycle.limit,
        lastReset: userDoc.billingCycle.lastReset.toISOString()
      };
    },
    getSlots: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await SlotMachine.find();
    },
    getSlot: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await SlotMachine.findById(id);
    },
    getSlotStats: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const slot = await SlotMachine.findById(id);
      return slot.metrics;
    },
    getAgents: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      if (user.role === 'admin') {
        return await User.find({ role: 'agent' });
      } else {
        // For non-admin users, return agents where they are the parent
        return await User.find({ parentAgent: user.id });
      }
    },
    getAgent: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new AuthenticationError('Not authorized');
      return await User.findOne({ _id: id, role: 'agent' });
    },
    getSubAgents: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'agent') throw new AuthenticationError('Not authorized');
      return await User.find({ parentAgent: user.id });
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const { username, email, password } = input;
      
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new UserInputError('User already exists');
      }

      const user = await User.create({
        username,
        email,
        password,
        role: 'user'
      });

      const token = generateAccessToken(user);

      return {
        success: true,
        accessToken: token,
        user
      };
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        throw new UserInputError('Invalid credentials');
      }

      const token = generateAccessToken(user);

      return {
        success: true,
        accessToken: token,
        user
      };
    },
    logout: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return true;
    },
    createApiKey: async (_, { input }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('Not authenticated');
        }

        const apiKey = new ApiKey({
          name: input.name,
          user: user.id,
          key: ApiKey.generateApiKey()
        });

        await apiKey.save();

        return {
          success: true,
          apiKey,
          error: null
        };
      } catch (error) {
        return {
          success: false,
          apiKey: null,
          error: error.message
        };
      }
    },
    deleteApiKey: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const apiKey = await ApiKey.findOneAndDelete({
        _id: id,
        user: user.id
      });

      return !!apiKey;
    },
    toggleApiKeyStatus: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const apiKey = await ApiKey.findOne({
        _id: id,
        user: user.id
      });

      if (!apiKey) throw new UserInputError('API key not found');

      apiKey.status = apiKey.status === 'active' ? 'inactive' : 'active';
      await apiKey.save();

      return apiKey;
    },
    updateBalance: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const userDoc = await User.findById(user.id);
      await userDoc.updateBalance(input.amount);

      return userDoc.balance;
    },
    createSlot: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new AuthenticationError('Not authorized');

      return await SlotMachine.create(input);
    },
    updateSlotMetrics: async (_, { id, input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const slot = await SlotMachine.findById(id);
      if (!slot) throw new UserInputError('Slot machine not found');

      slot.metrics.totalBets++;
      slot.metrics.totalWins += input.win > 0 ? 1 : 0;
      slot.metrics.rtp = ((slot.metrics.totalWins / slot.metrics.totalBets) * 100) || 0;
      slot.metrics.hitFrequency = (slot.metrics.totalWins / slot.metrics.totalBets) || 0;
      slot.metrics.maxWin = Math.max(slot.metrics.maxWin, input.win);

      await slot.save();
      return slot.metrics;
    },
    createAgent: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const { username, email, password, currency, callbackUrl, ggrPercentage, agentSettings } = input;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new UserInputError('User already exists');
      }

      const agentData = {
        username,
        email,
        password,
        role: 'agent',
        currency,
        callbackUrl,
        ggrPercentage,
        agentSettings: {
          profitShare: agentSettings.profitShare
        }
      };

      // Set parent agent if the creator is not an admin
      if (user.role !== 'admin') {
        agentData.parentAgent = user.id;
      }

      const agent = await User.create(agentData);

      return {
        success: true,
        agent,
        error: null
      };
    },
    updateAgent: async (_, { id, input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new AuthenticationError('Not authorized');

      const agent = await User.findOneAndUpdate(
        { _id: id, role: 'agent' },
        { $set: input },
        { new: true }
      );

      if (!agent) throw new UserInputError('Agent not found');

      return {
        success: true,
        agent
      };
    },
    suspendAgent: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new AuthenticationError('Not authorized');

      const agent = await User.findOneAndUpdate(
        { _id: id, role: 'agent' },
        { status: 'suspended' }
      );

      return !!agent;
    },
    activateAgent: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new AuthenticationError('Not authorized');

      const agent = await User.findOneAndUpdate(
        { _id: id, role: 'agent' },
        { status: 'active' }
      );

      return !!agent;
    },
    updateAgentBalance: async (_, { agentId, amount }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      // Find the agent
      const agent = await User.findById(agentId);
      if (!agent) throw new UserInputError('Agent not found');

      // Check if the user is the parent agent or admin
      if (user.role !== 'admin' && agent.parentAgent?.toString() !== user.id) {
        throw new AuthenticationError('Not authorized');
      }

      // Check if user has enough balance when adding to agent's balance
      if (amount > 0) {
        const userDoc = await User.findById(user.id);
        if (userDoc.balance < amount) {
          throw new UserInputError('Insufficient balance');
        }
        // Deduct from user's balance
        await userDoc.updateBalance(-amount);
      }

      // Update agent's balance
      await agent.updateBalance(amount);
      
      return agent.balance;
    },
    toggleAgentStatus: async (_, { agentId }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      // Find the agent
      const agent = await User.findById(agentId);
      if (!agent) throw new UserInputError('Agent not found');

      // Check if the user is the parent agent or admin
      if (user.role !== 'admin' && agent.parentAgent?.toString() !== user.id) {
        throw new AuthenticationError('Not authorized');
      }

      // Toggle status between active and suspended
      agent.status = agent.status === 'active' ? 'suspended' : 'active';
      await agent.save();

      return agent;
    },
  }
};

module.exports = resolvers; 