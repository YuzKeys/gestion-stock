import jwt from 'jsonwebtoken';

export function generateJWT({ id, username, isAdmin }) {
    return new Promise((resolve, reject) => {

        //? Donnée à stocker dans le token  (Mapping : Business -> Token)
        //? Attention, elle seront accessible !
        const data = {
            id,
            name: username,
            role: isAdmin ? 'admin' : 'member',
        };

        //? Clef pour signer le token
        const secret = process.env.JWT_SECRET;

        //? Les options du token
        const options = {
            algorithm: 'HS512',
            expiresIn: '10h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }

        //? Générer le token
        jwt.sign(data, secret, options, (error, token) => {
            // Si la génération échoue
            if (error) {
                reject(error);
                return;
            }

            // Envoi du token
            resolve(token);
        });
    });
}

export function decodeJWT(token) {
    return new Promise((resolve, reject) => {

        //? Clef de signature du token
        const secret = process.env.JWT_SECRET;

        //? Les options de validation
        const options = {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }

        //? Validation
        jwt.verify(token, secret, options, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            //? Récuperation des données du token  (Mapping : Token -> Business)
            resolve({
                id: data.id,
                username: data.name,
                isAdmin: data.role === 'admin'
            });
        });
    });
}