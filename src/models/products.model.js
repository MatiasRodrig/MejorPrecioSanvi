import { DataTypes } from 'sequelize';
import db from '../../db.js';
import Supermarket from './supermarket.model.js';

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
    }
}, {
    timestamps: true
});

Product.belongsTo(Supermarket, { foreignKey: 'SupermarketId' });
Supermarket.hasMany(Product, { foreignKey: 'SupermarketId' });

export default Product;