import {Request, Response} from "express";
import db from "../config/models/index";
import argon2 from "argon2";
import {Op} from "sequelize";
import jwt from 'jsonwebtoken';

export class ProfilController {

    // CREATION DE PROFILE

    static async registerProfil(req: Request, res: Response): Promise<void> {
        const {email, password, pseudo} = req.body;

        if (!email || !password || !pseudo) {
            res.status(400).json({message: 'Every field is required.'});
            return;
        }

        try {

            const user = await db.Player.findOne({
                where: {
                    pseudo: pseudo,
                    email: email,
                }
            });
            if (!user) {
                const hashedPassword = await argon2.hash(password);
                const newUser = await db.Player.create({
                    email,
                    password: hashedPassword,
                    pseudo,
                });
                res.status(201).json('User successfully registered.');
            } else {
                res.status(409).json({error: "Username or email already taken"});
            }
        } catch (error: any) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(409).json({message: 'Username or email already taken.'});
            } else {
                res.status(500).json({message: 'Server Error.'});
            }
        }
    }

    //UPDATE DE PROFIL

    static async updatePlayer(req: Request, res: Response) {
        try {
            // Récupère l'ID de l'utilisateur connecté
            const {playerId} = req.params;
            if (!playerId) {
                return res.status(401).json({error: "Unauthenticated user."});
            }

            const {
                favorite_champion_id,
                hated_champion_id,
                email,
                password,
                pseudo,
                elo,
                tournament_won,
                is_active
            } = req.body;

            // Vérifie que tous les champs obligatoires sont remplis.
            if (!favorite_champion_id && !hated_champion_id && !email && !password && !pseudo && !elo && !tournament_won && !is_active) {
                return res.status(400).json({error: "No data to update."});
            }

            // Prépare l'objet de mise à jour
            const updateFields: Partial<{
                favorite_champion_id: string;
                hated_champion_id: string;
                email: string;
                password: string;
                pseudo: string;
                elo: number;
                tournament_won: number;
                is_active: boolean;
            }> = {};
            if (favorite_champion_id) updateFields.favorite_champion_id = favorite_champion_id;
            if (hated_champion_id) updateFields.hated_champion_id = hated_champion_id;
            if (pseudo) updateFields.pseudo = pseudo;
            if (elo) updateFields.elo = elo;
            if (tournament_won) updateFields.tournament_won = tournament_won;
            if (is_active) updateFields.is_active = is_active;
            if (email) {
                // Vérifier si l'email est déjà utilisé
                const existingPlayerEmail = await db.Player.findOne({where: {email, id: {[Op.ne]: playerId}}});
                if (existingPlayerEmail) {
                    return res.status(409).json({error: "This email is already in use."});
                }
                updateFields.email = email;
            }
            if (password) {
                // Hacher le mot de passe avec argon2
                updateFields.password = await argon2.hash(password);
            }

            // Met à jour le profil du joueur dans la base de données
            const [updatedRowsCount, [updatedPlayer]] = await db.Player.update(updateFields, {
                where: {player_id: playerId}, // Met à jour uniquement le joueur connecté (par son id)
                returning: true, // Retourne le joueur mis à jour (utile avec PostgreSQL)
            });

            // Vérifie si la mise à jour a bien eu lieu
            if (updatedRowsCount === 0) {
                return res.status(404).json({error: "User not found."});
            }

            // Retourne un message de succès et l'utilisateur mis à jour
            res.status(200).json({
                message: "Your profile has been successfully updated.",
                player: updatedPlayer,
            });
        } catch (error) {
            console.error("Error while updating a user:", error);
            res.status(500).json({error: "Server error."});
        }
    }

    // ! AFFICHAGE D'UN JOUEUR PAR ID ! \\

    static async getProfilById(req: Request, res: Response) {
        try {
            const {id} = req.params;

            // * "User" DANS "sequelize.User.findByPk(id);" À MODIFIER SELON SYNTAXE CHOISIE
            const user = await db.Player.findOne(id);

            if (!user) {
                res.status(404).json({error: "User not found."});
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: "Server error."});
        }
    }

    // LOGIN du joueur
    static async login(req: Request, res: Response) {
        const {email, password} = req.body;

        try {
            const player = await db.Player.findOne({
                where: {email}
            });

            if (!player) {
                return res.status(401).json({error: 'Invalid email or password'});
            }

            const isValid = await argon2.verify(player.password, password);
            if (!isValid) {
                return res.status(401).json({error: 'Invalid email or password'});
            }

            const token = jwt.sign(
                {userId: player.player_id},
                process.env.JWT_SECRET as string,
                {expiresIn: '3h'}
            );

            res.json({
                token,
                user: {
                    id: player.player_id,
                    username: player.username,
                    email: player.email
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({error: 'Server error'});
        }
    };

    static async updatePlayerActiveStatus(req: Request, res: Response) {
        const {playerId} = req.params;
        try {
            const user = db.Player.findOne({where: {player_id: playerId}});
            const updatedActivity = !user.is_active
            await db.Player.update(
                {
                    is_active: updatedActivity
                },
                {
                    where: {id_player: playerId}
                }
            )
        } catch (error) {
            console.error("Error while updating player active status:", error);
            res.status(500).json({error: "Server error."});
        }
    }


    // sélection du perso préféré et son skin et du perso le plus détesté (liste déroulante pour les 3) et envoi vers la DB
    async favoriteHatedChar(req: any, res: any) {
        const {favChar} = req.favChar;

        const {favSkin} = req.favSkin;

        const {hateChar} = req.hateChar;

        res.json(favChar, favSkin, hateChar);

    };
}