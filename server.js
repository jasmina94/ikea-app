const dotenv = require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const cors = require('cors');
const { GraphQLSchema } = require('./schema');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true
}));

const PORT = process.env.SERVER_PORT || 5001;

app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`);
});