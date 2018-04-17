import React from 'react';
import gql from 'graphql-tag'; // allows us to write graphql query in JS
import { graphql } from 'react-apollo';

// pass data from the server's index.js to the client
const App = ({data}) => <h1>{data.hi}</h1>;

const hiQuery = gql`
{
  hi
}
`;

// this connects the query to our app using the higher order component pattern
export default graphql(
    hiQuery
)(App);