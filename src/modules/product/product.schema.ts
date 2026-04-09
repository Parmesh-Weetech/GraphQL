export const productTypeDefs = `#graphql
    type Product {
        id: ID!
        name: String!
        price: Float!
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(name: String!, price: Float!): Product!
    }
`;