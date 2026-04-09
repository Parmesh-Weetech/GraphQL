export const cartTypeDefs = `#graphql
    type CartItem {
        id: ID!
        product: Product!
        quantity: Int!
    }

    type Cart {
        id: ID!
        items: [CartItem!]!
        user: User!
    }

    type Query {
        cart(userId: ID!): Cart!
    }

    type Mutation {
        addToCart(productId: ID!, quantity: Int!): CartItem!
    }
`;