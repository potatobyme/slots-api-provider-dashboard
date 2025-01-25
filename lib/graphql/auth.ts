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
        role
        balance
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
        role
        balance
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
      role
      balance
      lastLogin
    }
  }
`;

export const GET_BALANCE_QUERY = gql`
  query GetBalance {
    getBalance
  }
`;

export const UPDATE_BALANCE_MUTATION = gql`
  mutation UpdateBalance($input: UpdateBalanceInput!) {
    updateBalance(input: $input)
  }
`; 