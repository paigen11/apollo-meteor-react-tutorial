import Resolutions from './resolutions';

// no id is needed, mongodb and meteor will automatically assign one
// Resolutions.insert({
//    name: "Test res"
// });

// fetch will give us just the info we're looking for
// const res = Resolutions.find({}).fetch();
// console.log(res);

// for when you screw up data to the db...
// Resolutions.remove({});

// query itself, the schema for graphql doesn't need to perfectly mirror the data being passed in
export default {
    Query: {
        resolutions() {
            return Resolutions.find({}).fetch();
        }
    },

    Mutation: {
        createResolution(){
            console.log('got here');
            // const resolutionId = Resolutions.insert({
            // name: "Test res"
            // });
        }
    }
};
