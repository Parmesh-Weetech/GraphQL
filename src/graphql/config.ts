import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';

export const graphqlConfig: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: path.join(process.cwd(), 'src', 'graphql', 'schema.gql'),
    sortSchema: true,
    graphiql: true,
    playground: false,
    debug: true,
};
