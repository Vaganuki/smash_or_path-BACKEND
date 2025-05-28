import { Request, Response, RequestHandler } from 'express';
import Tournament from '../config/models/tournament.model';
import sequelize from '../config/database';

export class TournamentController {
    public updateTournament: RequestHandler = async (req: Request, res: Response): Promise<any> => {
        try {
            const tournamentId = req.params.id;
            const tournamentModel = Tournament(sequelize);

            const updateData = {
                winner_tournament_player_id: req.body.winner_tournament_player_id,
                fight_id: req.body.fight_id,
                first_place_player_id: req.body.first_place_player_id,
                second_place_player_id: req.body.second_place_player_id,
                third_place_player_id: req.body.third_place_player_id,
                first_place_reward: req.body.first_place_reward,
                second_place_reward: req.body.second_place_reward,
                third_place_reward: req.body.third_place_reward
            };

            const [updatedRows] = await tournamentModel.update(updateData, {
                where: {
                    tournament_id: tournamentId
                }
            });

            if (updatedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No tournament found with the given ID'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Tournament updated successfully'
            });

        } catch (error) {
            console.error('Error while updating tournament :', error);
            return res.status(500).json({
                success: false,
                message: 'Error while updating tournament',
                error: error
            });
        }
    }
}