import { DataTypes, Sequelize, Model} from "sequelize";
import {Eats} from "../../@types/types";

// Optionnel : Typage TypeScript pour le modèle Eats
export default (sequelize: Sequelize) => {
    return sequelize.define<Model<Eats>>(
        "Eats",
        {
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "player", // Nom de la table (pas la fonction)
                    key: "player_id"
                }
            },
            banana_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "banana", // Nom de la table
                    key: "banana_id"
                }
            }
        },
        {
            tableName: "eats",
            timestamps: false
        }
    );
};
