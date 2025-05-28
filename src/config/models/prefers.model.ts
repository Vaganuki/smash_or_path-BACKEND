import {Prefers} from "../../@types/types";
import {DataTypes, Model, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Prefers>>(
        "prefers",
        {
            player_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'player',
                    key: 'player_id'
                }
            },
            champion_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'champion',
                    key: 'champion_id'
                }
            }
        },
        {
            tableName: "prefers",
            timestamps: false
        }
    );
};