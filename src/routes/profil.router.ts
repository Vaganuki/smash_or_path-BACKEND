import { Router } from 'express';
import { ProfilController } from '../controllers/profil.controller';

const router = Router();
const profilController = new ProfilController();

router.post('/login', profilController.login);

export default router;
