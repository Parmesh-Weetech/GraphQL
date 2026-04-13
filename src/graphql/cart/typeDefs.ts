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
        cart: Cart
        cartItems: [CartItem!]!
        cartItem(id: ID!): CartItem
    }

    type Mutation {
        addToCart(productId: ID!, quantity: Int!): CartItem! @auth(requires: USER)
        removeFromCart(id: ID!): Boolean! @auth(requires: USER)
        clearCart: Boolean! @auth(requires: USER)
    }
`;