import {Banana, Eats, Player} from "../../@types/types";
import { DataTypes, Sequelize, Model } from "sequelize";

export default (sequelize: Sequelize) => {
    const BananaModel = sequelize.define<Banana>(
        "banana",
        {
            banana_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            brand:{
                type: DataTypes.STRING,
                allowNull: false
            }

        },
        {
            tableName: "banana", // Nom de la table dans la base de données
            timestamps: false // Pas de colonnes createdAt/updatedAt
        }
    );
    return BananaModel;
};