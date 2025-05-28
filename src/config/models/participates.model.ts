import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ParticipatesAttributes {
  player_id: number;
  tournament_id: number;
}

interface ParticipatesCreationAttributes extends Optional<ParticipatesAttributes, never> {}

class Participates extends Model<ParticipatesAttributes, ParticipatesCreationAttributes> implements ParticipatesAttributes {
  public player_id!: number;
  public tournament_id!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Participates.init(
  {
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'players', // nom de la table des joueurs
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tournaments', // nom de la table des tournois
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'participates',
    modelName: 'Participates',
    timestamps: true, // createdAt et updatedAt automatiques
    indexes: [
      {
        unique: true,
        fields: ['player_id', 'tournament_id'] // Contrainte unique composite
      }
    ]
  }
);

export { Participates, ParticipatesAttributes, ParticipatesCreationAttributes };