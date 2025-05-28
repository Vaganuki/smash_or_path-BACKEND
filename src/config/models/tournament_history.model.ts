import {Banana, Eats, Player, TournamentHistory} from "../../@types/types";
import { DataTypes, Sequelize, Model } from "sequelize";

export default (sequelize: Sequelize) => {
    const Tournament_historyModel = sequelize.define<TournamentHistory>(
        "tournament_history",
        {
            tournament_history_id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

        },
        {
            tableName: "tournament_history", // Nom de la table dans la base de données
            timestamps: false // Pas de colonnes createdAt/updatedAt
        }
    );
    return Tournament_historyModel;
};