import {DataTypes, Model, Sequelize} from "sequelize";
import { Participates } from "../../@types/types";

export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Participates>>(
        "Participates",
        {
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "player",
                    key: "player_id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "tournament",
                    key: "tournament_id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
        {
            tableName: "participates",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['player_id', 'tournament_id']
                }
            ]
        }
    );
    
};