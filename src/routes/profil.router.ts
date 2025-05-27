// routes/user.routes.ts
import { Router } from 'express';
import { getUserProfile } from '../controllers/profil.controller';

const router = Router();

router.get('/profile/:userId', getUserProfile);

export default router;
