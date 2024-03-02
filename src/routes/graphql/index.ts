import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { graphqlSchema } from './graphqlSchema.js';
import { rootLoader } from './loaders/rootLoader.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;
      const errors = validate(graphqlSchema, parse(query), [depthLimit(5)]);
      if (errors.length) {
        return reply.send({errors})
      }

      return await graphql({
        schema: graphqlSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders: rootLoader(prisma),
        },
      });
    },
  });
};

export default plugin;
