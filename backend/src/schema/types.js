const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type BillingCycle {
    current: Float!
    limit: Float!
    lastReset: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    balance: Float!
    currency: String!
    callbackUrl: String
    ggrPercentage: Float!
    parentAgent: User
    agentSettings: AgentSettings!
    billingCycle: BillingCycle!
    status: String!
    lastLogin: String
    createdAt: String!
    updatedAt: String!
  }

  type AgentSettings {
    profitShare: Float!
  }

  type ApiKey {
    id: ID!
    name: String!
    key: String!
    status: String!
    lastUsed: String
    createdAt: String!
    updatedAt: String!
  }

  type ApiKeyResponse {
    success: Boolean!
    apiKey: ApiKey
    error: String
  }

  type SlotMachine {
    id: ID!
    machineId: String!
    name: String!
    location: String!
    status: String!
    gameType: String!
    metrics: SlotMetrics!
    createdAt: String!
    updatedAt: String!
  }

  type SlotMetrics {
    totalBets: Int!
    totalWins: Int!
    rtp: Float!
    hitFrequency: Float!
    maxWin: Float!
  }

  type AuthResponse {
    success: Boolean!
    accessToken: String
    user: User
    error: String
  }

  type CreateAgentResponse {
    success: Boolean!
    agent: User
    error: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateApiKeyInput {
    name: String!
  }

  input UpdateBalanceInput {
    amount: Float!
  }

  input UpdateBillingLimitInput {
    limit: Float!
  }

  input CreateSlotInput {
    machineId: String!
    name: String!
    location: String!
    gameType: String!
  }

  input UpdateSlotMetricsInput {
    bet: Float!
    win: Float!
  }

  input AgentSettingsInput {
    profitShare: Float!
  }

  input CreateAgentInput {
    username: String!
    email: String!
    password: String!
    currency: String!
    callbackUrl: String
    ggrPercentage: Float!
    agentSettings: AgentSettingsInput!
  }

  input UpdateAgentInput {
    currency: String
    callbackUrl: String
    ggrPercentage: Float
    agentSettings: AgentSettingsInput
    status: String
  }

  type Query {
    me: User
    getBalance: Float!
    getBillingCycle: BillingCycle!
    getApiKeys: [ApiKey!]!
    getSlots: [SlotMachine!]!
    getSlot(id: ID!): SlotMachine
    getSlotStats(id: ID!): SlotMetrics!
    getAgents: [User!]!
    getAgent(id: ID!): User
    getSubAgents: [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    logout: Boolean!
    createApiKey(input: CreateApiKeyInput!): ApiKeyResponse!
    deleteApiKey(id: ID!): Boolean!
    toggleApiKeyStatus(id: ID!): ApiKey!
    updateBalance(input: UpdateBalanceInput!): Float!
    updateBillingLimit(input: UpdateBillingLimitInput!): BillingCycle!
    createSlot(input: CreateSlotInput!): SlotMachine!
    updateSlotMetrics(id: ID!, input: UpdateSlotMetricsInput!): SlotMetrics!
    createAgent(input: CreateAgentInput!): CreateAgentResponse!
    updateAgent(id: ID!, input: UpdateAgentInput!): CreateAgentResponse!
    suspendAgent(id: ID!): Boolean!
    activateAgent(id: ID!): Boolean!
    updateAgentBalance(agentId: ID!, amount: Float!): Float!
    toggleAgentStatus(agentId: ID!): User!
  }
`;

module.exports = typeDefs; 