import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const fight = sequelize.define('Fight', {
  fight_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player1_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  player2_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  champion_p1_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  champion_p2_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  score_p1: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  score_p2: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  winner_player_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'fight',
  timestamps: false
});
