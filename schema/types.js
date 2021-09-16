const axios = require('axios');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList
} = require('graphql');
const CATEGORIES_URL = process.env.JSON_SERVER_PATH + ':' + process.env.JSON_SERVER_PORT + process.env.CATEGORIES_PATH;

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        products: {
            type: GraphQLList(ProductType),
            resolve: (category) => {
                return axios.get(PRODUCTS_URL)
                    .then(res => {
                        const products = res.data;
                        return products.filter(product => product.categoryId === category.id)
                    });
            }
        }
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        inStock: { type: GraphQLNonNull(GraphQLBoolean) },
        price: { type: GraphQLNonNull(GraphQLFloat) },
        categoryId: { type: GraphQLNonNull(GraphQLInt) },
        category: {
            type: CategoryType,
            resolve: (product) => {
                return axios.get(CATEGORIES_URL)
                    .then(res => {
                        const categories = res.data;
                        return categories.find(category => category.id === product.categoryId);
                    });
            }
        }
    })
});

module.exports = {
    ProductType,
    CategoryType
}