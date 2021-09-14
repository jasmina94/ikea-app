const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLSchema } = require('graphql');

// const categories = [
//     { id: 1, name: 'Smart home', description: 'Everything you need for smart home' },
//     { id: 2, name: 'Furniture', description: 'Comfort first' },
//     { id: 3, name: 'Beds & mattresses', description: 'Sleep well' },
//     { id: 4, name: 'Storage & organization', description: 'Organize your space' }
// ];

// const products = [
//     { id: 1, name: 'SYMFONISK', description: 'WiFi bookshelf speaker, black', inStock: true, price: 99.00, categoryId: 1 },
//     { id: 2, name: 'MITTLED', description: 'LED ktchn drawer lighting w sensor, dimmable white23 "', inStock: true, price: 15.99, categoryId: 1 },
//     { id: 3, name: 'FYRTUR', description: 'Blackout roller blind, wireless/battery operated gray38x76 ¾ "', inStock: true, price: 169.00, categoryId: 1 },
//     { id: 4, name: 'FINNALA', description: 'Sofa with chaise, Totebo light beige', inStock: false, price: 799.00, categoryId: 2 },
//     { id: 5, name: 'KEDJEBO', description: 'Ottoman, yellow/beige', inStock: true, price: 99.00, categoryId: 2 },
//     { id: 5, name: 'OTTERÖN / INNERSKÄR', description: 'Pouffe, in/outdoor, dark green22 7/8 "', inStock: true, price: 69.99, categoryId: 2 },
//     { id: 6, name: 'MALM', description: 'High bed frame/4 storage boxes, black-brown/LuröyQueen', inStock: true, price: 349.00, categoryId: 3 },
//     { id: 7, name: 'BILLY', description: 'Bookcase, white31 1/2x11x79 1/2 "', inStock: true, price: 49.00, categoryId: 4 },
//     { id: 8, name: 'PÄRKLA', description: 'Pouffe, in/outdoor, dark green22 7/8 "', inStock: false, price: 1.99, categoryId: 4 },
// ]

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        products: {
            type: GraphQLList(ProductType),
            resolve: (category) => {
                return axios.get('http://localhost:3004/products')
                    .then(res =>
                        res.data.filter(product => product.categoryId === category.id));
                //without json-server
                //return products.filter(product => product.categoryId === category.id);
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
                return categories.find(category => category.id === product.category_id)
            }
        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        categories: {
            type: GraphQLList(CategoryType),
            description: 'List of all categories',
            resolve: () => categories
        },
        products: {
            type: GraphQLList(ProductType),
            description: 'List of all products',
            resolve: () => products
        },
        category: {
            type: CategoryType,
            description: 'Get single category',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => categories.find(category => category.id === args.id)
        },
        product: {
            type: ProductType,
            description: 'Get single product by id',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => products.find(product => product.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        addCategory: {
            type: CategoryType,
            description: 'Add a category',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const category = { id: categories.length + 1, name: args.name, description: args.description };
                categories.push(category);
                return category;
            }
        },
        addProduct: {
            type: ProductType,
            description: 'Add a product',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                inStock: { type: GraphQLBoolean },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                categoryId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const product = {
                    id: products.length + 1,
                    name: args.name,
                    description: args.description ? args.description : '',
                    inStock: args.inStock ? args.inStock : false,
                    price: args.price,
                    categoryId: args.categoryId
                };
                products.push(product);
                return product;
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});