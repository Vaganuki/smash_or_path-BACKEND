import { Request, Response, NextFunction } from 'express';
import db from '../config/models/index';

export class TournamentController {

    // ! CRUD : Delete tournament ! \\
    
    static async deleteTournament(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tournament = await db.Tournament.findByPk(id);

            if (!tournament) {
                return res.status(404).json({ error: "Tournament not found !" });
            }

            await db.Fight.destroy({ where: { tournament_id: id } });
            await tournament.destroy();

            res.status(200).json({ message: "Tournament and related matches deleted with success !" });
        } catch (err) {
            console.error(err); // Utile pour le debug
            res.status(500).json({ message: "Something went wrong." });
        }
    }
}