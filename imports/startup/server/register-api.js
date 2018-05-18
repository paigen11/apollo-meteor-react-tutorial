import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';
import GoalsSchema from '../../api/goals/Goals.graphql';
import GoalsResolvers from '../../api/goals/resolvers';



//hidey hidey hidey hidey ho

// defining the graphql function and what it returns, you can add schema files just by adding it to type defs
const typeDefs = [
    GoalsSchema,
    ResolutionsSchema,
    UsersSchema
];

//combine the resolver and the resolution resolvers with the assistance of lodash
const resolvers = merge( GoalsResolvers, ResolutionsResolvers, UsersResolvers);

// make executable schema requires both type defs and resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// this sets up an apollo server for us in our meteor app
createApolloServer({ schema });