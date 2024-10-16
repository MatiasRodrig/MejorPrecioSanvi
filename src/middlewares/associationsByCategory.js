import Product from "../models/products.model.js";
import Categories from "../models/categories.model.js";


Categories.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});

Product.belongsTo(Categories, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});