import { Router } from 'express';
import { getUserProfile } from '../controllers/profil.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);

export default router;
