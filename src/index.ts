import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { createApolloServer } from './graphql/index.ts';

const PORT = process.env.PORT || 4000;

const app = express();

const { middleware } = await createApolloServer();

app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    middleware
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});