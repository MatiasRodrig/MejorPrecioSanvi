import { DataTypes } from "sequelize";
import sequelize from '../../db.js';

const Categories = sequelize.define(
    "categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {  // Aquí es donde defines la columna 'name'
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true // Este es el segundo objeto que define las opciones del modelo
    }
);

export default Categories;