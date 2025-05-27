import { Router } from 'express';
import { ProfilController } from '../controllers/profil.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const profilController = new ProfilController();


router.get('/profile', authenticateToken, profilController.profilConnection);

router.post('/login', profilController.login);

export default router;
