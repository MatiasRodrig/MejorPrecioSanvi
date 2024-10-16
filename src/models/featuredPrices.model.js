import { DataTypes } from "sequelize";
import db from "../../db.js";

const FeaturedPrices = db.define('FeaturedPrices', {
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products', // el nombre de tu tabla de productos
            key: 'id'
        }
    }
});

FeaturedPrices.associate = function (models) {
    FeaturedPrices.belongsTo(models.Product), {
        foreignKey: 'ProductId',
        as: 'product'
    }
}

export default FeaturedPrices