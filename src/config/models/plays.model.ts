import {Plays} from "../../@types/types";
import {DataTypes, Model, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Plays>>(
        "plays",
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
            fight_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'fight',
                    key: 'fight_id'
                }
            }
        },
        {
            tableName: "plays",
            timestamps: false
        }
    );
};