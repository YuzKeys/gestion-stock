import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateJWT } from "../helpers/jwt.helper.js";
import { memberDetailDTO } from "../DTO/member.dto.js";
import Usermodel from '../models/user.model.js'

// Fake data pour la démo

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifie si l'utilisateur existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Identifiants incorrects" });
            }

            // Vérifie le mot de passe
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ error: "Identifiants incorrects" });
            }

            // Génère un token JWT
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.status(200).json({ token });

        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Vérifie si l'utilisateur existe déjà
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: "Email déjà utilisé" });
            }

            // Crée un nouvel utilisateur
            const newUser = new User({ username, email, password, role });
            await newUser.save();

            res.status(201).json({ message: "Utilisateur créé avec succès" });

        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    getAllMembers: async (req, res) => {
        const memberList = await Usermodel.find(); //recuperation des membres
        const members = memberList.map(m => new memberDetailDTO(m)); //Mapping
        res.status(200).json(members);
    }
};
export default authController;




