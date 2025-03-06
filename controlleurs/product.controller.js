import Product from "../models/Product.js";


const productController = {

    getAllProducts: async (req, res) => {
        const products = await Product.find(); //Trouver Tous les produits
        res.status(200).json(products) // Retourner tous les produits
    },

    getProductById: (req, res) => {
        res.sendStatus(501);
    },

    addNewProduct: async (req, res) => {
        try {
            // Créer une nouvelle instance du produit à partir des données envoyées par le client
            const newProduct = new Product({
                nom: req.body.nom,
                reference: req.body.reference,
                description: req.body.description,
                categorie: req.body.categorie,
                quantite: req.body.quantite
            });

            // Enregistrer le produit dans la base de données
            const savedProduct = await newProduct.save();

            // Retourner une réponse avec le produit ajouté
            res.status(201).json({
                message: "Produit ajouté avec succès",
                product: savedProduct
            });
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de l'ajout du produit", error: err });
        }
    }

}

export default productController;