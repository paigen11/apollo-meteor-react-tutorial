import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../../ui/App';

// what's the url for the graphql server
const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql')
});

// set up an authorization link for loggin in to Apollo
const authLink = new ApolloLink((operation, forward) => {
   const token = Accounts._storedLoginToken();
   // stores token in our headers meteor login token
   operation.setContext(() => ({
     headers: {
         'meteor-login-token': token,
     }
   }));
    return forward(operation);
});

// create in memory cache
const cache = new InMemoryCache();

// create client that takes in link, authlink and cache
const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache
});

//wrap client in apollo provider component and make app available to render function
const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

// we're just running the react.render on meteor startup, that's all
Meteor.startup(() => {
    render(<ApolloApp />, document.getElementById('app'))
});
