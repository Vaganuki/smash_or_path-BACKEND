export class ProfilController{

    // sélection du perso préféré et son skin et du perso le plus détesté (liste déroulante pour les 3) et envoi vers la DB
    async favoriteHatedChar (req:any,res:any) {
        const { favChar } = req.favChar;

        const { favSkin } = req.favSkin;

        const { hateChar } = req.hateChar;

        res.json(favChar,favSkin,hateChar);

    };
};