export const orderTypeDefs = `#graphql
    type OrderItem {
        id: ID!
        product: Product!
        quantity: Int!
        price: Float! # The price at the time of order
    }

    type Order {
        id: ID!
        total: Float!
        items: [OrderItem!]!
        user: User!
    }

    type Query {
        orders(userId: ID!): [Order!]!
        order(id: ID!): Order
    }

    type Mutation {
        placeOrder(userId: ID!): Order!
    }
`;