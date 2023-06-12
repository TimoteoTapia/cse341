import { gql } from 'apollo-server-express';

const userTypesDefs = gql`
  enum Notification {
    yes
    no
  }

  type User {
    _id: ID
    username: String
    password: String
    email: String
    phone: Float
    age: Int
    notification: Notification
  }

  type Query {
    getAllUser: [User]!
    getUserById(_id: ID!): [User!]!
    getUserByStatus(notification: Notification!): [User!]!
  }

  input CreateNewUserInput {
    username: String!
    password: String!
    email: String!
    phone: Float
    age: Int
    notification: Notification
  }

  input UpdateUserInput {
    username: String!
    password: String!
    email: String!
    phone: Float
    age: Int
    notification: Notification
  }

  type Mutation {
    createNewUser(users: CreateNewUserInput!): User!
    updateUser(_id: ID!, users: UpdateUserInput): User!
    deleteUser(_id: ID!): String!
  }
`;

export default userTypesDefs;
