import { ProductDetailDTO, ProductDTO } from '../DTO/product.dto.js'
import Product from "../models/Product.js";

const productController = {

    // Afficher la liste des produits
    getAllProducts: async (req, res) => {
        // Gestion de la pagination //! /api/product?offset=2&limit=2
        const { offset, limit } = req.pagination;

        // Récuperation des produits en DTO avec Gestion d'erreur en cas d'echec
        try {
            const productList = await Product.find(); //Trouver Tous les produits
            const products = productList.map(p => new ProductDTO(p)); //Mapping et renvoie des produits en DTO
            res.status(200).json(products) // Retourner tous les produits

        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la recuperation des Produits", error: err });
        }
    },
    getProductDetailById: async (req, res) => {
        res.sendStatus(501);
    },

    // Ajouter des produits
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