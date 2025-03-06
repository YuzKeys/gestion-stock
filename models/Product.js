import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    nom: {
        type: String
    },
    reference: {
        type: Number
    },
    description: {
        type: String
    },
    categorie: {
        type: String
    },
    quantite: {
        type: Number
    }

}, {
    collection: 'product'
});
const Product = mongoose.model('Product', productSchema);
export default Product;