import { gql } from '@apollo/client';

export const GET_API_KEYS = gql`
  query GetApiKeys {
    getApiKeys {
      id
      name
      key
      status
      lastUsed
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_API_KEY = gql`
  mutation CreateApiKey($input: CreateApiKeyInput!) {
    createApiKey(input: $input) {
      success
      apiKey {
        id
        name
        key
        status
        lastUsed
        createdAt
        updatedAt
      }
      error
    }
  }
`;

export const DELETE_API_KEY = gql`
  mutation DeleteApiKey($id: ID!) {
    deleteApiKey(id: $id)
  }
`;

export const TOGGLE_API_KEY_STATUS = gql`
  mutation ToggleApiKeyStatus($id: ID!) {
    toggleApiKeyStatus(id: $id) {
      id
      name
      key
      status
      lastUsed
      createdAt
      updatedAt
    }
  }
`; 