import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Vérification du format email
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["user", "admin", "manager"],  // Limite les rôles possibles
        default: "user"
    }
}, { collection: 'users' }, { timestamps: true }); // Ajoute createdAt et updatedAt

// Hashage du mot de passe avant enregistrement
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Création du modèle User
const User = mongoose.model("User", userSchema);

export default User;
