import { ProductDetailDTO, ProductDTO } from '../DTO/product.dto.js'
import Product from "../models//product.model.js";

const productController = {

    // Afficher la liste des produits
    getAllProducts: async (req, res) => {
        // Gestion de la pagination //! /api/product?offset=2&limit=2
        const { offset, limit } = req.pagination;
        console.log(offset, limit);


        // Récuperation des produits en DTO avec Gestion d'erreur en cas d'echec
        try {
            const productList = await Product.find(null, null, {
                skip: offset, limit
            }); //Trouver Tous les produits
            const products = productList.map(p => new ProductDTO(p)); //Mapping et renvoie des produits en DTO
            res.status(200).json(products) // Retourner tous les produits

        } catch (err) {
            res.status(500).json({ message: 'Cannot get product !', error: err });
        }
    },

    // Obtenir un produit a partir de son id 
    getProductDetailById: async (req, res) => {
        const id = req.params.id; // Garder l'ID en tant que string car l'id contient des chiffres et des lettres

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid product ID !' });
        }

        try {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found !' });
            }

            return res.status(200).json(new ProductDetailDTO(product));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error !' });
        }
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
                message: "Product Added !",
                product: savedProduct
            });
        } catch (err) {
            res.status(500).json({ message: "Cannot add product", error: err });
        }
    },
    // Modifier un produit existant
    updateProduct: async (req, res) => {
        const { id } = req.params; // ID du produit à modifier
        const { nom, reference, description, categorie, quantite } = req.body; // Récupération des nouvelles données

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid product ID !' });
        }

        try {
            // Chercher le produit existant dans la base de données
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found !' });
            }

            // Mettre à jour les propriétés du produit
            product.nom = nom || product.nom;
            product.reference = reference || product.reference;
            product.description = description || product.description;
            product.categorie = categorie || product.categorie;
            product.quantite = quantite || product.quantite;

            // Sauvegarder les modifications dans la base de données
            const updatedProduct = await product.save();

            // Retourner une réponse avec le produit mis à jour
            res.status(200).json({
                message: "Product updated successfully !",
                product: updatedProduct
            });
        } catch (err) {
            res.status(500).json({ message: "Cannot update product", error: err });
        }
    }


}

export default productController;