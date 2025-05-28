import {Player} from "../../@types/types";
import { DataTypes, Sequelize, Model } from "sequelize";

export default (sequelize: Sequelize) => {
    const PlayerModel = sequelize.define<Player>(
        "player",
        {
            player_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // L'email doit être unique
                validate: {
                    isEmail: true // Validation que la valeur est un email
                }},
                pseudo : {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password : {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                elo:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0 // Valeur par défaut pour l'Elo
                },
                tournament_won :{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0 // Valeur par défaut pour le nombre de tournois gagnés
                },
                favorite_champion_id :{
                    type: DataTypes.INTEGER,
                    allowNull: true // Peut être nul si aucun champion favori n'est défini
                },
                hated_champion_id : {
                    type: DataTypes.INTEGER,
                    allowNull: true // Peut être nul si aucun champion détesté n'est défini
                },
                is_active   : {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true // Valeur par défaut pour l'état actif du joueur
                },
        },
        {
            tableName: "player", // Nom de la table dans la base de données
            timestamps: false // Pas de colonnes createdAt/updatedAt
        }
    );
    return PlayerModel;

};