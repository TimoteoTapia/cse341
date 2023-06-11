import { gql } from 'apollo-server-express';

const orderTypesDefs = gql`
  enum ShippingMethod {
    express
    pickup
  }

  type Order {
    _id: ID
    product: String
    price: Float
    quantity: Int
    shippingMethod: ShippingMethod
    color: String
    additionalNotes: String
    discount: Int
  }

  type Query {
    getAllOrder: [Order]!
    getOrderById(_id: ID!): [Order!]!
    getOrderByStatus(shippingMethod: ShippingMethod!): [Order!]!
  }

  input CreateNewOrderInput {
    product: String!
    price: Float!
    quantity: Int!
    shippingMethod: ShippingMethod!
    color: String
    additionalNotes: String
    discount: Int
  }

  input UpdateOrderInput {
    product: String!
    price: Float!
    quantity: Int!
    shippingMethod: ShippingMethod!
    color: String
    additionalNotes: String
    discount: Int
  }

  type Mutation {
    createNewOrder(orders: CreateNewOrderInput!): Order!
    updateOrder(_id: ID!, orders: UpdateOrderInput): Order!
    deleteOrder(_id: ID!): String!
  }
`;

export default orderTypesDefs;
