import {Skin} from "../../@types/types";
import {DataTypes, Sequelize, Model} from "sequelize";

export default (sequelize: Sequelize) => {
    const SkinModel = sequelize.define<Skin>(
        "skin",
        {
            skin_id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            champion_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image_url:{
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName:'skin',
            timestamps: false
        }
    );
    return SkinModel;
};