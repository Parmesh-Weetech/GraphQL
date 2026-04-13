import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typeDefs.ts";
import { verifyAccessToken } from "../modules/user/utils/generateAuthTokens.ts";
import type { AccessTokenContext } from "./context.type.ts";

export const createApolloServer = async (): Promise<{ server: ApolloServer<AccessTokenContext>; middleware: ReturnType<typeof expressMiddleware> }> => {
    const server = new ApolloServer<AccessTokenContext>({
        typeDefs,
        resolvers
    });

    await server.start();

    const middleware = expressMiddleware(server, {
        context: async ({ req }): Promise<AccessTokenContext> => {
            const authorization = req.headers.authorization || null;

            if (authorization && authorization.startsWith("Bearer ")) {
                try {
                    const token = authorization.split(" ")[1]!;
                    const decodedToken = await verifyAccessToken(token);

                    if (!decodedToken) {
                        return { user: null };
                    }

                    return { user: decodedToken.user };
                } catch (err) {
                    console.error("Invalid token:", err);
                    return { user: null };
                }
            }

            return { user: null };
        }
    });

    return { server, middleware };
};