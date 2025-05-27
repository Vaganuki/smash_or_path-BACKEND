import { Request, Response } from "express";
import db from "../models";
import argon2 from "argon2";
import { Op } from "sequelize";


export class ProfilController {
//? modification d'un profiles
static async updatePlayer (req: Request, res: Response){
    try{

        // Récupère l'ID de l'utilisateur connecté
        const playerId = req.player?.id;
        if (!playerId) {
            return res.status(401).json({ error: "Utilisateur non authentifié." });
        }

        const {lastname, firstname, email, password, pseudo} = req.body

        // Vérifie que tous les champs obligatoires sont remplis.
        if (!lastname && !firstname && !email && !password && !pseudo){
            return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
        }


        // Prépare l'objet de mise à jour
        const updateFields: any = {};
        if (lastname) updateFields.lastname = lastname;
        if (firstname) updateFields.firstname = firstname;
        if (pseudo) updateFields.pseudo = pseudo;
        if (email) {
        // Vérifier si l'email est déjà utilisé
        const existingPlayerEmail = await db.player.findOne({ where: { email, id: { [Op.ne]: playerId }} });
        if (existingPlayerEmail) {
            return res.status(409).json({ error: "Cet email est déjà utilisé." });
        }
            updateFields.email = email;
        }
        if (password){
            // Hacher le mot de passe avec argon2
            updateFields.password = await argon2.hash(password);
        }

        // Met à jour le profil du joueur dans la base de données
        const [updatedRowsCount, [updatePlayer]] = await db.player.update(updateFields,{
                where: { id: playerId },// Met à jour uniquement du joueur connecté (par son id)
                returning: true,// Retourne le joueur mis à jour (utile avec PostgreSQL)
        })

        // Vérifie si la mise à jour a bien eu lieu
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        // Retourne un message de succès et l'utilisateur mis à jour
        res.status(200).json({
            message: "Votre profil a bien été mis à jour.",
            player: updatedPlayer
        });
    } catch (error) {
        console.error("Erreur lors de la modification d'un utilisateur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
}
}