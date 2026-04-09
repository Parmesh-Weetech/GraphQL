import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolvers.ts";
import { typeDefs } from "./graphql/typeDefs.ts";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async () => ({})
});

console.log(`Server is running on ${url}`);
