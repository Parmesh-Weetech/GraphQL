export const orderTypeDefs = `#graphql
    type OrderItem {
        id: ID!
        product: Product!
        quantity: Int!
        price: Float!
    }

    type Order {
        id: ID!
        total: Float!
        items: [OrderItem!]!
    }

    type Query {
        orders(userId: ID!): [Order!]!
        order(id: ID!): Order
    }

    type Mutation {
        placeOrder(userId: ID!): Order!
    }
`;