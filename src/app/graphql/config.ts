import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';

export const createGraphqlConfig = (isProd: string): ApolloDriverConfig => ({
    driver: ApolloDriver,
    autoSchemaFile: path.join(process.cwd(), 'src', 'app', 'graphql', 'schema.gql'),
    sortSchema: true,
    playground: false,
    debug: isProd === 'dev' ? true : false,
    introspection: isProd === 'dev' ? true : false,
    context: ({ req, res }) => ({ req, res }),
    graphiql: isProd === 'dev' ? true : false
});
