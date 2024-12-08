const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String]!
    attendance: Float!
    role: String!
  }
  type LoginResponse {
    token: String!
    user: User!
  }
  type Query {
  listEmployees(page: Int, limit: Int, sortBy: String, sortOrder: String): [Employee]
}

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String]!
      attendance: Float!
      role: String
    ): Employee
    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String]
      attendance: Float
    ): Employee
  }
`;

module.exports = typeDefs;
