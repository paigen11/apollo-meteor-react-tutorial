import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../../ui/App';

// what's the url for the graphql server
const httpLink = new HttpLink({
    uri: Meteor.absoluteUrl('graphql')
});

// create in memory cache
const cache = new InMemoryCache();

// create client that takes in link and cache
const client = new ApolloClient({
    link: httpLink,
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
