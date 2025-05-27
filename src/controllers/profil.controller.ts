import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { Player } from '../config/models/player';

export class ProfilController {

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const player = await Player.findOne({
                where: { email }
            });

            if (!player) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isValid = await argon2.verify(player.password, password);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { userId: player.player_id },
                process.env.JWT_SECRET as string,
                { expiresIn: '3h' }
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
            res.status(500).json({ error: 'Server error' });
        }
    };
}
