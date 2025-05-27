import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class Player extends Model {
    public player_id!: number;
    public email!: string;
    public username!: string;
    public password!: string;
}

Player.init({
    player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'player',
    timestamps: false // si ta table n'a pas createdAt / updatedAt
});
