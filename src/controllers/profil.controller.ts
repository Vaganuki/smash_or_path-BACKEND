import { Request, Response, NextFunction } from 'express';
import { db } from '../config/models/index';


export class ProfilController {
    // ! AFFICHAGE D'UN JOUEUR PAR ID ! \\

    static async getPlayerbyId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // * "User" DANS "db.User.findByPk(id);" À MODIFIER SELON SYNTAXE CHOISIE
            const user = await db.User.findByPk(id);

            if (!user) {
                const error = new Error("Impossible de trouver cet utilisateur !");
                (error as any).status = 404;
                throw error;
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}