import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export function authDirective(schema) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];

            if (authDirective) {
                const { requires } = authDirective;
                const originalResolver = fieldConfig.resolve || defaultFieldResolver;

                fieldConfig.resolve = async (parent, args, context, info) => {
                    const user = context.user;

                    if (!user || user.userRole !== requires) {
                        throw new Error('Forbidden');
                    }

                    return originalResolver(parent, args, context, info);
                };
            }

            return fieldConfig;
        },
    });
}