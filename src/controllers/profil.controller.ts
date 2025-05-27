import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // On doit le garder pour pouvoir hasher le PWD du user 
import pool from '../config/database'; 

export class ProfilControlleur {
  static async registerProfile(req: Request, res: Response): Promise<void> {
    const { email, password, pseudo, prenom, nom } = req.body;

    if (!email || !password || !pseudo || !prenom || !nom) {
      res.status(400).json({ message: 'Tous les champs sont requis.' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        'INSERT INTO users (email, password, pseudo, prenom, nom) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, pseudo, prenom, nom',
        [email, hashedPassword, pseudo, prenom, nom]
      );

      res.status(201).json({
        message: 'Utilisateur créé avec succès.',
        user: result.rows[0],
      });
    } catch (error: any) {
      console.error(error);
      if (error.code === '23505') {
        res.status(409).json({ message: 'Email déjà utilisé.' });
      } else {
        res.status(500).json({ message: 'Erreur serveur.' });
      }
    }
  }
}
