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
    billingCycle: BillingCycle!
    lastLogin: String
    createdAt: String!
    updatedAt: String!
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

  type Query {
    me: User
    getBalance: Float!
    getBillingCycle: BillingCycle!
    getApiKeys: [ApiKey!]!
    getSlots: [SlotMachine!]!
    getSlot(id: ID!): SlotMachine
    getSlotStats(id: ID!): SlotMetrics!
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
  }
`;

module.exports = typeDefs; 