import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      accessToken
      user {
        id
        username
        email
        balance
        role
        status
        billingCycle {
          current
          limit
          lastReset
        }
        createdAt
      }
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      accessToken
      user {
        id
        username
        email
        balance
        role
        status
        billingCycle {
          current
          limit
          lastReset
        }
        createdAt
      }
      error
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      balance
      role
      status
      billingCycle {
        current
        limit
        lastReset
      }
      createdAt
    }
  }
`;

export const GET_BALANCE_QUERY = gql`
  query GetBalance {
    getBalance
  }
`;

export const GET_BILLING_CYCLE_QUERY = gql`
  query GetBillingCycle {
    getBillingCycle {
      current
      limit
      lastReset
    }
  }
`;

export const UPDATE_BALANCE_MUTATION = gql`
  mutation UpdateBalance($input: UpdateBalanceInput!) {
    updateBalance(input: $input)
  }
`;

export const UPDATE_BILLING_LIMIT_MUTATION = gql`
  mutation UpdateBillingLimit($input: UpdateBillingLimitInput!) {
    updateBillingLimit(input: $input) {
      current
      limit
      lastReset
    }
  }
`; 