import { DataTypes } from 'sequelize';
import db from '../../db.js';

const Supermarket = db.define('Supermarket', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Supermarket;
