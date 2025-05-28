import { Request, Response } from 'express';
import defineTournament from '../config/models/tournament.model';
import definePlayer from '../config/models/player.model';
import defineTournamentHistory from '../config/models/tournament_history.model';
import { fight as Fight } from '../config/models/fight.model';
import { Champion } from '../config/models/champion.model';
import sequelize from '../config/database';

const Tournament = defineTournament(sequelize);
const Player = definePlayer(sequelize);
const TournamentHistory = defineTournamentHistory(sequelize);

export class TournamentController {
    static async getCurrentTournament(_req: Request, res: Response) {
        try {
            const tournament = await Tournament.findOne({
                order: [['tournament_id', 'DESC']],
                include: [
                    { model: Player, as: 'winner' },
                    { model: Player, as: 'firstPlace' },
                    { model: Player, as: 'secondPlace' },
                    { model: Player, as: 'thirdPlace' }
                ]
            });

            if (!tournament) {
                return res
                    .status(404)
                    .json({ message: 'No tournament found.' });
            }

            const fights = await Fight.findAll({
                where: { tournament_id: tournament.getDataValue('tournament_id') },
                include: [
                    { model: Player, as: 'player1' },
                    { model: Player, as: 'player2' },
                    { model: Champion, as: 'championP1' },
                    { model: Champion, as: 'championP2' },
                    { model: Player, as: 'winner' }
                ],
                order: [['fight_id', 'ASC']]
            });

            const currentFight =
                fights.find((f: any) => f.score_p1 === null || f.score_p2 === null) ||
                fights[fights.length - 1];

            return res
                .json({
                    tournament,
                    currentFight,
                    previousFights: fights.filter(f => f !== currentFight)
                });
        } catch (error) {
            console.error('Current tournament error:', error);
            return res
                .status(500)
                .json({ error: 'Internal server error.' });
        }
    }

    static async getTournamentHistory(_req: Request, res: Response) {
        try {
            const tournamentHistory = await TournamentHistory.findAll({
                include: [{
                    model: Tournament,
                    include: [
                        { model: Player, as: 'winner' },
                        { model: Player, as: 'firstPlace' },
                        { model: Player, as: 'secondPlace' },
                        { model: Player, as: 'thirdPlace' },
                        {
                            model: Fight,
                            include: [
                                { model: Player, as: 'player1' },
                                { model: Player, as: 'player2' },
                                { model: Player, as: 'winner' },
                                { model: Champion, as: 'championP1' },
                                { model: Champion, as: 'championP2' }
                            ]
                        }
                    ]
                }]
            });

            return res
                .json(tournamentHistory);
        } catch (error) {
            console.error('Tournament history error:', error);
            return res
                .status(500)
                .json({ error: 'Internal server error.' });
        }
    }
}
