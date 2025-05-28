// ! IMPORTS ! \\

import {DataTypes, Model, Sequelize} from 'sequelize';
import {Tournament as TournamentAttributes} from '../../@types/types'; // w/e the import route.


// ! CONFIGURATION DU MODÈLE "TOURNAMENT" ! \\

export const Tournament = (sequelize: Sequelize) => {
    return sequelize.define<Model<TournamentAttributes>>(
        'Tournament',
        {
            tournament_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            winner_tournament_player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'player',
                    key: 'player_id'
                }
            },
            fight_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'fight',
                    key: 'fight_id'
                }
            },
            first_place_player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'player',
                    key: 'player_id'
                }
            },
            second_place_player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'player',
                    key: 'player_id'
                }
            },
            third_place_player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'player',
                    key: 'player_id'
                }
            },
            first_place_reward: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            second_place_reward: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            third_place_reward: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'tournament',
            timestamps: false
        }
    );
}