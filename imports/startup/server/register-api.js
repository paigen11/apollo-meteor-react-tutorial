import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';

const testSchema = `
type Query {
  hi: String
}
`;

// defining the graphql function and what it returns, you can add schema files just by adding it to type defs
const typeDefs = [
    testSchema,
    ResolutionsSchema
];

// query itself
const resolvers = {
    Query: {
        hi() {
            return "Hello world";
        }
    }
};

// make executable schema requires both type defs and resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// this sets up an apollo server for us in our meteor app
createApolloServer({ schema });