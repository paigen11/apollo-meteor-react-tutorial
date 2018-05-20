import Resolutions from './resolutions';
import Goals from '../goals/goals';

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
        resolutions(obj, args, {userId}) {
            return Resolutions.find({
                userId
            }).fetch();
        }
    },

    // type needs to be type of the schema, even for goals
    Resolution: {
        goals: (resolution) =>
            Goals.find({
                resolutionId: resolution._id
            }).fetch(),
        completed: resolution => {
            const goals = Goals.find({
                resolutionId: resolution._id,
            }).fetch();
            // if there's nothing in the array itself, this will be false (not completed);
            if(goals.length === 0) return false;
            const completedGoals = goals.filter(goal => goal.completed);
            return goals.length === completedGoals.length;
        }
    },

    Mutation: {
        // destructure the args param by turning it into just the name with the { name }
        createResolution(obj, { name }, { userId }){
            // console.log(name);
            const resolutionId = Resolutions.insert({
            // es6 way of creating an object
            name,
            userId
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
