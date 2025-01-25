const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    balance: Float!
    lastLogin: String
    createdAt: String!
    updatedAt: String!
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

  input UpdateBalanceInput {
    amount: Float!
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
    getSlots: [SlotMachine!]!
    getSlot(id: ID!): SlotMachine
    getSlotStats(id: ID!): SlotMetrics!
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    logout: Boolean!
    updateBalance(input: UpdateBalanceInput!): Float!
    createSlot(input: CreateSlotInput!): SlotMachine!
    updateSlotMetrics(id: ID!, input: UpdateSlotMetricsInput!): SlotMetrics!
  }
`;

module.exports = typeDefs; 