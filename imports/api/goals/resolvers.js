import Goals from './goals';

export default {
    Mutation: {
        createGoal(obj, { name, resolutionId }, {userId}){
            if(user){
                const goalId = Goals.insert({
                    name,
                    resolutionId,
                    completed: false
                });
                return Goals.findOne(goalId);
            }
            throw new Error('Unauthorized');
        },
        toggleGoal(obj, {_id}) {
            const goal = Goals.findOne(_id);
            Goals.update(_id, {
                // using $set will only override the properties you want changed, instead of all of them
                $set: {
                    completed: !goal.completed
                }
            });
            return Goals.findOne(_id);
        }
    }
};