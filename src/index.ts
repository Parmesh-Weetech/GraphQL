import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./graphql/resolvers.ts";
import { typeDefs } from "./graphql/typeDefs.ts";
import cors from 'cors';
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();

app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({})
    })
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});