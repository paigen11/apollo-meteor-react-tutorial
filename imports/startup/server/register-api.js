import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';

const testSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
}
`;

//hi

// defining the graphql function and what it returns, you can add schema files just by adding it to type defs
const typeDefs = [ testSchema, ResolutionsSchema ];

// query itself
const testResolvers = {
    Query: {
        hi() {
            return "Hello world";
        }
    }
};

//combine the resolver and the resolution resolvers with the assistance of lodash
const resolvers = merge( testResolvers, ResolutionsResolvers);

// make executable schema requires both type defs and resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// this sets up an apollo server for us in our meteor app
createApolloServer({ schema });