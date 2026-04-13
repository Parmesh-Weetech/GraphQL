export const authTypeDefs = `#graphql
    input LoginPayloadInput {
        email: String!
        password: String!
    }

    type AuthPayload {
        accessToken: String!
        refreshToken: String!
    }

    type Mutation {
        login(loginPayload: LoginPayloadInput!): AuthPayload!
    }
`;