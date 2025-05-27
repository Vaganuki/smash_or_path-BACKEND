import express from 'express';
import cors from 'cors';
import ProfilRouter from './profil.router';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Active CORS pour Angular
app.use(cors({
    origin: 'http://localhost:4200' // <-- Angular local
}));

// ✅ Route recupération utilisateur
app.use('/api/users', ProfilRouter);

// ✅ Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
