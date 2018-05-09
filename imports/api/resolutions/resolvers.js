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
        // destructure the args param by turning it into just the name with the { name }
        createResolution(obj, { name }, context){
            // console.log(name);
            const resolutionId = Resolutions.insert({
            // es6 way of creating an object
            name
            });
            // create the object than go through the resolutions,
            // find the one with the corresponding id and return it (graphql mutations expect returns)
            return Resolutions.findOne(resolutionId);
        }

        // deleteResolution(obj, { name }, context){
        //     console.log(name);
        //     const resolutionIdToRemove = Resolutions.filter({
        //         name
        //     });
        //     if(!name) {
        //         throw new Error(`Couldn't find post ${name}`);
        //     } else {
        //         console.log('Resolution found')
        //     }
            // return Resolutions.delete( name );
        // }
    }
};
