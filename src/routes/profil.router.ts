import { Router } from 'express';
import { ProfileController } from '../controllers/profil.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const profileController = new ProfileController();


router.get('/profile', authenticateToken, profileController.profileConnection);

export default router;
