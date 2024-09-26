import { DataTypes } from 'sequelize';
import db from '../../db.js';

const Supermarket = db.define('Supermarket', {
    nameSupermarket: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Supermarket;
