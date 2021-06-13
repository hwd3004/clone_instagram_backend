import { gql } from 'apollo-server'

// graphql에서는 password를 작성 할 필요 없다
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

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
  }

  type Query {
    seeProfile(username: String!): User
  }
`
