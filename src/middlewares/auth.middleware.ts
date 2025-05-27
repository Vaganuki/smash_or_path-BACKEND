import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number;
}

// Étend le type Request pour inclure la propriété user
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token manquant ou invalide' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET as string;
        req.user = jwt.verify(token, secret) as JwtPayload;

        next();
    } catch (err) {
        res.status(403).json({ error: 'Token invalide ou expiré' });
        return;
    }
};
