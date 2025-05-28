import { DataTypes } from 'sequelize';
import  sequelize  from '../database';

export const Champion = sequelize.define('Champion', {
    champion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'champion',
    timestamps: false
});