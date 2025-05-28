import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Profil } from '../config/models/profil'; 

export class ProfilControlleur {
    static async registerProfile(req: Request, res: Response): Promise<void> {
    const { email, password, pseudo, prenom, nom } = req.body;

    if (!email || !password || !pseudo || !prenom || !nom) {
      res.status(400).json({ message: 'Tous les champs sont requis.' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Profil.create({
        email,
        password: hashedPassword,
        pseudo,
        prenom,
        nom
      });

      res.status(201).json({
        message: 'Utilisateur créé avec succès.',
        user: {
          id: newUser.getDataValue('id'),
          email: newUser.getDataValue('email'),
          pseudo: newUser.getDataValue('pseudo'),
          prenom: newUser.getDataValue('prenom'),
          nom: newUser.getDataValue('nom')
        }
      });
    } catch (error: any) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({ message: 'Email déjà utilisé.' });
      } else {
        res.status(500).json({ message: 'Erreur serveur.' });
      }
    }
  }
}
