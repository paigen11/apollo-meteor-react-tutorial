import React from 'react';
import gql from 'graphql-tag'; // allows us to write graphql query in JS
import { graphql } from 'react-apollo';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';
import { withApollo } from 'react-apollo'; // this is used to resetStore, which will refetch our data when people log in or out


// pass data from the server's index.js to the client
const App = ({ loading, resolutions, client, user }) => {
    // this says if the data's still loading, return null, if it's done return the array of items
    if(loading) return null;
    return (
        <div>
            { user._id ? (
                <button onClick={() => {
                    Meteor.logout();
                    client.resetStore();
                }}
                >
                Logout
                </button>
            ) : (
                <div>
                    <RegisterForm client={client} />
                    <LoginForm client={client} />
                </div>
                    )}
            <ResolutionForm />
            <ul>
                {resolutions.map(resolution => (
                    <li key={resolution._id}>
                        <span style={{
                            textDecoration: resolution.completed ? 'line-through': 'none'
                        }}>
                            {resolution.name}
                        </span>
                        <ul>
                            {resolution.goals.map(goal => (
                                <Goal goal={goal} key={goal._id} />
                            ))}
                        </ul>
                        <GoalForm resolutionId={resolution._id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const resolutionsQuery = gql`
    query Resolutions {
      resolutions {
        _id
        name
        completed
        goals {
            name
            _id
            completed
        }
      }
    user {
        _id
    }
  }
`;

// this connects the query to our app using the higher order component pattern, spread the data using props and make the data being passed in cleaner
export default graphql(resolutionsQuery, {
    props: ({data}) => ({ ...data })
})(withApollo(App));