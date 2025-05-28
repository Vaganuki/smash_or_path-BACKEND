import { Router } from 'express';
import { TournamentController } from '../controllers/tournament.controller';

const tournamentController = new TournamentController();

const router = Router();

router.put('/tournaments/:id', tournamentController.updateTournament)

export default router;