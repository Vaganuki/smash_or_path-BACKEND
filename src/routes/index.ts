const router = require('express').Router();

const charPref = require('../controllers/profil.controller');


// dans la route du profil on affiche le perso favoris + skin et détesté
router.get('/profil', charPref.favoriteHatedChar);


module.exports = router;