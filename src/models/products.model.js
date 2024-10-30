import { DataTypes } from 'sequelize';
import db from '../../db.js';
import Supermarket from './supermarket.model.js';
import categories from './categories.model.js';


const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoryID: {
        type: DataTypes.INTEGER,
        references: {
            model: categories,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Product.belongsTo(Supermarket, { foreignKey: 'SupermarketId' });
Supermarket.hasMany(Product, { foreignKey: 'SupermarketId' });



export default Product;
