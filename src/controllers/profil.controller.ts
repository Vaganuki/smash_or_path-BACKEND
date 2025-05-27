import { Request, Response } from 'express';
import { db } from '../config/database';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export class ProfilController {

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const result = await db.query(
                'SELECT * FROM player WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            const user = result.rows[0];

            const isValid = await argon2.verify(user.password, password);
            if (!isValid) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            // ✅ Génère le token avec player_id
            const token = jwt.sign(
                { userId: user.player_id },
                process.env.JWT_SECRET as string,
                { expiresIn: '3h' }
            );

            res.json({
                token,
                user: {
                    id: user.player_id,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    };

}
