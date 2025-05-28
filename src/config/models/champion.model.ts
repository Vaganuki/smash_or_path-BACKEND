import { DataTypes } from 'sequelize';
import  sequelize  from '../database';
import { Champion } from "../../@types/types";

export const ChampionModel = sequelize.define('Champion', {
    champion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'champion',
    timestamps: false
});

// @ts-ignore
ChampionModel.associate = (models: any) => {
    ChampionModel.hasMany(models.Player, {
        foreignKey: 'favorite_champion_id',
        as: 'preferredByPlayers'
    });

    ChampionModel.hasMany(models.Player, {
        foreignKey: 'hated_champion_id',
        as: 'hatedByPlayers'
    });

    ChampionModel.hasMany(models.Skin, {
        foreignKey: 'champion_id',
        as: 'skins'
    });

    ChampionModel.hasMany(models.Fight, {
        foreignKey: 'champion_p1_id',
        as: 'fightsAsP1'
    });

    ChampionModel.hasMany(models.Fight, {
        foreignKey: 'champion_p2_id',
        as: 'fightsAsP2'
    });
};

export default ChampionModel;