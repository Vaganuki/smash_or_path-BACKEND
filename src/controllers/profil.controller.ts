import { Request, Response } from 'express';
import { db } from '../config/database';

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
        res.status(401).json({ error: 'Unauthenticated user' });
        return;
    }

    try {
        const result = await db.query(
            '', //REMPLIR Le '' AVEC LE SELECT
            [userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({
            username: result.rows[0].username,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
