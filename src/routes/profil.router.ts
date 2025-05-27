import { ProfilController } from "./controllers/profil.controller";
import { authMiddleware } from "./middlewares/authMiddleware";


routes.put("/updatePlayer", authMiddleware, ProfilController.updatePlayer);