export class ProductDTO {

    constructor({ id, nom, quantite }) {
        this.id = id;
        this.nom = nom;
        this.quantite = quantite;
        this.url = `/api/product/${id}`
    }
}

export class ProductDetailDTO {

    constructor({ id, nom, reference, description, categorie, quantite }) {
        this.id = id;
        this.nom = nom;
        this.reference = reference;
        this.description = description;
        this.categorie = categorie;
        this.quantite = quantite;
    }
}