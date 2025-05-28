import {DataTypes, Model, Sequelize} from 'sequelize';
import {Champion} from "../../@types/types";

export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Champion>>(
        'champion',
        {
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

        },
        {
            tableName: 'champion',
            timestamps: false
        }
    )
}