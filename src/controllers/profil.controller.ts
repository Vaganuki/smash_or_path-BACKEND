import { Request, Response, NextFunction } from 'express';
import { db } from '../config/models/index';

// ! AFFICHAGE D'UN JOUEUR PAR ID ! \\

export const getPlayerbyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // * "user" DANS "db.user.findByPk(id);" À MODIFIER SELON SYNTAXE CHOISIE
        const player = await db.player.findByPk(id);
    
        if (!player) {
            const error = new Error("User not found !");
            (error as any).status = 404;
            throw error;
        }
    
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
}