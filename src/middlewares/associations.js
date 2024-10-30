import Product from "../models/products.model.js";
import Categories from "../models/categories.model.js";
import FeaturedPrices from "../models/featuredPrices.model.js";


Categories.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    as: 'Products' // Aquí defines el alias
});

Product.belongsTo(Categories, {
    foreignKey: 'categoryId',
    targetKey: 'id',
    as: 'Category' // Opcionalmente, defines el alias aquí también
});

Product.hasOne(FeaturedPrices, { foreignKey: 'ProductId', as: 'FeaturedPrice' });
FeaturedPrices.belongsTo(Product, { foreignKey: 'ProductId', as: 'Product' });