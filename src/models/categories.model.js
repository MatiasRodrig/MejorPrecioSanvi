import { DataTypes } from "sequelize";
import sequelize from '../../db.js'
import Product from "./products.model.js";

const Categories = sequelize.define(
    "categories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)


export default Categories