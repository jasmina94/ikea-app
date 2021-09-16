const axios = require('axios');
const { CategoryType } = require('./types');
const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const CATEGORIES_URL = process.env.JSON_SERVER_PATH + ':' + process.env.JSON_SERVER_PORT + process.env.CATEGORIES_PATH;

const mutations = {
    addCategory: {
        type: CategoryType,
        description: 'Add a category',
        args: {
            name: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString }
        },
        resolve: (parent, args) => {
            return axios.get(CATEGORIES_URL + '?_sort=id&_order=desc')
                .then(res => {
                    const lastCategory = res.data[0];
                    const newId = lastCategory.id + 1;
                    const category = {
                        id: newId,
                        name: args.name,
                        description: args.description ?? ''
                    };

                    return axios.post(CATEGORIES_URL, category)
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
    updateCategory: {
        type: CategoryType,
        description: 'Update category',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString }
        },
        resolve: (parent, args) => {
            return axios.get(CATEGORIES_URL + '?id=' + args.id)
                .then(res => {
                    if (res.data) {
                        let category = res.data[0];
                        category.name = args.name;
                        category.description = args.description ?? category.description;

                        return axios.put(CATEGORIES_URL + '/' + args.id, category)
                            .then(res => {
                                console.log(res.data);
                                return res.data;
                            })
                            .catch(err => {
                                console.log(err);
                                return false;
                            });

                    } else {
                        console.log(`Category with given id ${args.id} is not found.`);
                        return false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        }
    },
    deleteCategory: {
        type: GraphQLBoolean,
        description: 'Delete category',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
            return axios.delete(CATEGORIES_URL + '/' + args.id)
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
    },
}

module.exports = {
    categoryMutations: mutations
}