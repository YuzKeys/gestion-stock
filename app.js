import express from 'express';
import morgan from 'morgan';
import mainRouter from './routeurs/index.js';
import mongoose from 'mongoose';

const { PORT, NODE_ENV } = process.env;

// Fonction pour se connecter a mongodb avec avec le MONGO_URI
async function connectDb() {
    const { MONGO_URI } = process.env;
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connection to MongoDB : Success !')
    } catch (err) {
        console.log('Connection to MongoDB : Fail !');
        console.log(err);
        throw err;
    }
    return mongoose.Connection;
}
// Appelle de la fonction pour se connecter a mongodb
await connectDb()

// Creation de l'API
const app = express();

//! Middleware
// pour parser le json
app.use(express.json());
// pour les Log
app.use(morgan('tiny'));

//! Routes
// app.get('/api', (req, res) => {
//     res.status(200).json({ message: 'Bienvenu sur mon API' })
// });
app.use('/api', mainRouter)

//! Start
app.listen(PORT, () => {
    console.log(`WebAPI is running on port: http://localhost:${PORT} (Mode: ${NODE_ENV})`)
});

