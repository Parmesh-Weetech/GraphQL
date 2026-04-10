export const cartTypeDefs = `#graphql
    type CartItem {
        id: ID!
        product: Product!
        quantity: Int!
    }

    type Cart {
        items: [CartItem!]!
    }

    type Query {
        cart(userId: ID!): Cart
        cartItems(userId: ID!): [CartItem!]!
        cartItem(id: ID!): CartItem
    }

    type Mutation {
        addToCart(productId: ID!, quantity: Int!, userId: ID!): CartItem!
        removeFromCart(id: ID!): Boolean!
        clearCart(userId: ID!): Boolean!
    }
`;