export const cartTypeDefs = `#graphql
    type CartItem {
        id: ID!
        product: Product!
        quantity: Int!
        user: User!
    }

    type Cart {
        items: [CartItem!]!
        user: User!
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