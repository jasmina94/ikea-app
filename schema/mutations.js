const { productMutations } = require('./productMutations');
const { categoryMutations } = require('./categoryMutations');
const { GraphQLObjectType } = require('graphql');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        addCategory: categoryMutations.addCategory,
        updateCategory: categoryMutations.updateCategory,
        deleteCategory: categoryMutations.deleteCategory,
        addProduct: productMutations.addProduct,
        updateProduct: productMutations.updateProduct,
        updateProductPrice: productMutations.updatePrice,
        deleteProduct: productMutations.deleteProduct
    })
});

module.exports = {
    Mutation: RootMutationType
}
