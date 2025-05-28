import { DataTypes, Sequelize, Model } from "sequelize";
import { TournamentHistory } from "../../@types/types";

export default (sequelize: Sequelize) => {
    const TournamentHistoryModel = sequelize.define<TournamentHistory>(
        "TournamentHistory",
        {
            tournament_history_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            tournament_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "tournament", // nom de la table référencée
                    key: "tournament_id"
                }
            }
        },
        {
            tableName: "tournament_history",
            timestamps: false
        }
    );

    return TournamentHistoryModel;
};
