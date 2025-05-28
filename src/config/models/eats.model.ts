import { DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes } from "sequelize";

// Optionnel : Typage TypeScript pour le modèle Eats
export default (sequelize: Sequelize) => {
    const EatsModel = sequelize.define<Model<InferAttributes<any>, InferCreationAttributes<any>>>(
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

    return EatsModel;
};
