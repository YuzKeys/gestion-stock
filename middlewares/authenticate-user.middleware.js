import jwt from 'jsonwebtoken';

export function authenticateUserMiddleware(req, res, next) {
    const { JWT_SECRET } = process.env;
    const token = req.headers.authorization?.split(' ')[1]; //Récupère le TOKEN dans le header
    if (!token) {
        return res.status(401).json({ error: "Acces Refused !" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); //Verifier le token (dans .env)
        req.user = decoded; // Ajoute les infos de l'utilisateur dans req.user
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid Token !" });
    }
}  