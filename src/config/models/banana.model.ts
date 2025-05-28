import { DataTypes, Sequelize } from "sequelize";
import { Banana } from "../../@types/types";

export default (sequelize: Sequelize) => {
    const BananaModel = sequelize.define<Banana>(
        "Banana", // PascalCase recommandé pour les noms de modèles Sequelize
        {
            banana_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            brand: {
                type: DataTypes.STRING(50), // Cohérent avec ta définition SQL
                allowNull: false
            }
        },
        {
            tableName: "banana",
            timestamps: false
        }
    );

    return BananaModel;
};
