// routes/user.routes.ts
import { Router } from 'express';
import { getUserProfile } from '../controllers/profil.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile/:userId', authenticateToken, getUserProfile);

export default router;
