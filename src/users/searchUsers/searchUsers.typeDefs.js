import { gql } from 'apollo-server'

/**
export default gql`
  type Query {
    searchUsers(keyword: String!): [User]
  }
`
**/

export default gql`
  type searchUsersResult {
    searchedUsers: [User]
    totalPages: Int
  }

  type Query {
    searchUsers(keyword: String!, page: Int): searchUsersResult!
  }
`
