import React from 'react';
import gql from 'graphql-tag'; // allows us to write graphql query in JS
import { graphql } from 'react-apollo';
import ResolutionForm from './ResolutionForm';

// pass data from the server's index.js to the client
const App = ({ data }) => {
    // this says if the data's still loading, return null, if it's done return the array of items
    if(data.loading) return null;
    return (
        <div>
            <h1>{data.hi}</h1>
            <ResolutionForm refetch={data.refetch} />
            <ul>
                {data.resolutions.map(resolution => (
                    <li key={resolution._id}>{resolution.name}</li>
                ))}
            </ul>
        </div>
    );
};

const hiQuery = gql`
    {
      hi
      resolutions {
        _id
        name
      }
    }
`;

// this connects the query to our app using the higher order component pattern
export default graphql(hiQuery)(App);