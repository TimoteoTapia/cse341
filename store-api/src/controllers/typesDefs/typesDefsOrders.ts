import { gql } from 'apollo-server-express';

const orderTypesDefs = gql`
    enum OrderStatus {
        pending,
        delivered,
        canceled
    }

    type Order {
        _id: ID
        orderName: String
        orderUserId: ID
        dateOrder: String
        dateShipping: String
        orderStatus: OrderStatus
    }

    type Query {
        getAllOrder: [Order]!
        getOrderById(_id: ID!): [Order!]!
        getOrderByStatus(orderStatus: OrderStatus!): [Order!]!
    }

    input CreateNewOrderInput {
        orderName: String!
        orderUserId: ID!
        dateOrder: String!
        dateShipping: String!
        orderStatus: OrderStatus!
    }

    input UpdateOrderInput {
        orderName: String
        orderUserId: ID
        dateOrder: String
        dateShipping: String
        orderStatus: OrderStatus
    }

    type Mutation {
        createNewOrder(orders: CreateNewOrderInput!): Order!
        updateOrder(_id: ID!,orders: UpdateOrderInput): Order!
        deleteOrder(_id: ID!,): String!
    }
`;

export default orderTypesDefs;