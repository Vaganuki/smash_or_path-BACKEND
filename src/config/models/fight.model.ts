import {DataTypes, Model, Sequelize} from 'sequelize';
import {Fight} from "../../@types/types";

export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Fight>>(
        "fight",
        {
            fight_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            player1_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            player2_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            champion_p1_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            champion_p2_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            score_p1: {
                type: DataTypes.SMALLINT,
                allowNull: true
            },
            score_p2: {
                type: DataTypes.SMALLINT,
                allowNull: true
            },
            winner_player_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            tableName: 'fight',
            timestamps: false
        }
    )
}
