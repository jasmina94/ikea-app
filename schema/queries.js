const axios = require('axios');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const { ProductType, CategoryType } = require('./types');

const CATEGORIES_URL = process.env.JSON_SERVER_PATH + ':' + process.env.JSON_SERVER_PORT + process.env.CATEGORIES_PATH;
const PRODUCTS_URL = process.env.JSON_SERVER_PATH + ':' + process.env.JSON_SERVER_PORT + process.env.PRODUCTS_PATH;

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        categories: {
            type: GraphQLList(CategoryType),
            description: 'List of all categories',
            resolve: () => {
                return axios.get(CATEGORIES_URL).then(res => res.data);
            }
        },
        products: {
            type: GraphQLList(ProductType),
            description: 'List of all products',
            resolve: () => {
                return axios.get(PRODUCTS_URL).then(res => res.data);
            }
        },
        productByCategory: {
            type: GraphQLList(ProductType),
            description: 'List of products of certain category',
            args: {
                categoryId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                return axios.get(PRODUCTS_URL + '?categoryId=' + args.categoryId)
                    .then(res => res.data)
                    .catch(err => {
                        console.log(err);
                        return false;
                    });
            }
        },
        category: {
            type: CategoryType,
            description: 'Get single category',
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                return axios.get(CATEGORIES_URL + '?id=' + args.id)
                    .then(res => res.data[0])
                    .catch(err => {
                        console.log(err);
                        return false;
                    })
            }
        },
        product: {
            type: ProductType,
            description: 'Get single product by id',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                return axios.get(PRODUCTS_URL + '?id=' + args.id)
                    .then(res => res.data[0])
                    .catch(err => {
                        console.log(err);
                        return false;
                    });
            }
        }
    })
});

module.exports = {
    Query: RootQueryType
}