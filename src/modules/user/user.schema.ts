export const userTypeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        cart: Cart!
        orders: [Order]!
    }

    type Query {
        users: [User!]!
        user(userId: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!): User!
    }
`;