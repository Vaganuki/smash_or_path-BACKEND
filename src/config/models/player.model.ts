import { DataTypes, Sequelize } from "sequelize";
import { Player } from "../../@types/types";

export default (sequelize: Sequelize) => {
    const PlayerModel = sequelize.define<Player>(
        "Player", // Nom du modèle Sequelize (PascalCase recommandé)
        {
            player_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            pseudo: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(1024),
                allowNull: false
            },
            elo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tournament_won: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            favorite_champion_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "champion",
                    key: "champion_id"
                }
            },
            hated_champion_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "champion",
                    key: "champion_id"
                }
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            tableName: "player",
            timestamps: false
        }
    );

    return PlayerModel;
};
