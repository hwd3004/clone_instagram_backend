import { gql } from 'apollo-server'

// graphql의 type User에서는 password를 작성 할 필요 없다
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User

    login(username: String!, password: String!): LoginResult!
  }

  type Query {
    seeProfile(username: String!): User
  }
`
