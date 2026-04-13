export const baseTypeDefs = `#graphql
    enum UserRole {
        ADMIN
        USER
    }

    directive @auth(requires: UserRole!) on FIELD_DEFINITION
`;