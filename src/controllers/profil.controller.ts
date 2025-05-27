import { Request, Response } from 'express';
import { db } from '../config/database';

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const result = await db.query(
            '', //REMPLIR Le '' AVEC LE SELECT
            [userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return
        }

        res.json({
            username: result.rows[0].username,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
