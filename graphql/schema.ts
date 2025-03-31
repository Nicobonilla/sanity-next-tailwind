import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    orders: [Order!]
  }

  type Order {
    id: ID!
    user: User!
    product: Product!
    quantity: Int!
  }

  type Query {
    products: [Product!]
  }
`;