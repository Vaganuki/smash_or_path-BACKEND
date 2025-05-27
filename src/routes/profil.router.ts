import { Router } from 'express';
import { ProfilControlleur } from '../controllers/profil.controller';

const router = Router();

router.post('/register', ProfilControlleur.registerProfile);

export default router;
