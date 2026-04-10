import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typeDefs.ts";

export const createApolloServer = async (): Promise<{ server: ApolloServer; middleware: ReturnType<typeof expressMiddleware> }> => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    const middleware = expressMiddleware(server, {
        context: async ({ req }) => ({})
    });

    return { server, middleware };
};