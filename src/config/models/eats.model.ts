import {Eats, Player} from "../../@types/types";
import { DataTypes, Sequelize, Model } from "sequelize";

export default (sequelize: Sequelize) => {
    const EatsModel = sequelize.define<Eats>(
        "eats",
        {
            player_id: {
                player_id : DataTypes.INTEGER,
                allowNull: true
            },
            banana_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: "eats", // Nom de la table dans la base de données
            timestamps: false // Pas de colonnes createdAt/updatedAt
        }
    );
    return EatsModel; 
};