import { Router } from  'express';
import { db } from '../config/database';
const router = Router();


router.get('/profile/:userId', async (req: any, res: any) => {
    const userId = req.params.userId;

    try {
        const result = await db.query('', [userId]);  //REMPLIR Le '' AVEC LE SELECT
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({
            username: result.rows[0].username,
            jobs: result.rows[0].jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default router;