import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const createResolution = gql`
    mutation createResolution($name: String!) {
        createResolution(name: $name) {
            _id
        }
    }
`;

// const deleteResolution = gql`
//   mutation deleteResolution($name: String!) {
//     deleteResolution(name: $name) {
//         name
//     }
//   }
// `;

class ResolutionForm extends Component {
    state = {
        error: null
    };

    submitForm = () => {
        // console.log(this.name.value);
        this.props.createResolution({
            variables: {
                name: this.name.value
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ error: error.message });
        });
    };

    // deleteItem = () => {
    //     this.props.deleteResolution({
    //         variables: {
    //             name: this.name.value
    //         }
    //     })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <input type="text" ref={input => (this.name = input)} />
                <button onClick={this.submitForm}>Submit</button>
                {/*<input type="text" ref={input => (this.name = input)} />*/}
                {/*<button onClick={this.deleteItem}>Delete</button>*/}
            </div>
        )
    }
}

// export both the qgl query and the resolution form, you can update the name by doing so
export default compose (
    graphql(createResolution, {
        name: "createResolution",
        options: {
            refetchQueries: ['Resolutions']
        }
    })
    // graphql(deleteResolution, {
    //     name: "deleteResolution"
    // }),
)(ResolutionForm);