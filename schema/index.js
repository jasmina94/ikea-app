const { Query } = require('./queries');
const { Mutation } = require('./mutations');
const { GraphQLSchema } = require('graphql');

module.exports = {
    GraphQLSchema: new GraphQLSchema({
        query: Query,
        mutation: Mutation
    })
}