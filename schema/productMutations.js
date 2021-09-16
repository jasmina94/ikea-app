const axios = require('axios');
const { ProductType } = require('./types');
const { GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql');

const PRODUCTS_URL = process.env.JSON_SERVER_PATH + ':' + process.env.JSON_SERVER_PORT + process.env.PRODUCTS_PATH;

const mutations = {
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
            return axios.get(PRODUCTS_URL + '?_sort=id&_order=desc')
                .then(res => {
                    const lastProduct = res.data[0];
                    const newId = lastProduct.id + 1;
                    const product = {
                        id: newId,
                        name: args.name,
                        description: args.description ?? '',
                        inStock: args.inStock ?? false,
                        price: args.price,
                        categoryId: args.categoryId
                    };

                    return axios.post(PRODUCTS_URL, product)
                        .then(res => {
                            console.log(res.data);
                            return res.data;
                        })
                        .catch(err => {
                            console.log(err)
                            return false;
                        });

                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    },
    updateProduct: {
        type: ProductType,
        description: 'Update product',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            inStock: { type: GraphQLBoolean },
            price: { type: GraphQLNonNull(GraphQLFloat) }
        },
        resolve: (parent, args) => {
            return axios.get(PRODUCTS_URL + '?id=' + args.id)
                .then(res => {
                    if (res.data) {
                        let product = res.data[0];
                        product.name = args.name;
                        product.description = args.description ?? '';
                        product.inStock = args.inStock ?? false;
                        product.price = args.price;

                        return axios.put(PRODUCTS_URL + '/' + args.id, product)
                            .then(res => {
                                console.log(res.data);
                                return res.data;
                            })
                            .catch(err => {
                                console.log(err);
                                return false;
                            });

                    } else {
                        console.log(`Product with id: ${args.id} not found.`);
                        return false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    return false;
                })
        }
    },
    updatePrice: {
        type: ProductType,
        description: 'Update price of certain product',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            price: { type: GraphQLNonNull(GraphQLFloat) }
        },
        resolve: (parent, args) => {
            return axios.patch(PRODUCTS_URL + '/' + args.id, { price: args.price })
                .then(res => {
                    console.log(res.data);
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    },
    deleteProduct: {
        type: GraphQLBoolean,
        description: 'Delete product',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
            return axios.delete(PRODUCTS_URL + '/' + args.id)
                .then(res => {
                    if (res.data && Object.keys(res.data).length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    }
}

module.exports = {
    productMutations: mutations
}