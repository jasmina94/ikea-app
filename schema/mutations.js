const { productMutations } = require('./productMutations');
const { categoryMutations } = require('./categoryMutations');
const { GraphQLObjectType } = require('graphql');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => (
        { ...categoryMutations },
        { ...productMutations }
    )
});

module.exports = {
    Mutation: RootMutationType
}
