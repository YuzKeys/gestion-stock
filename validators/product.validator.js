import { z } from 'zod';

export const ProductSchema = z.object({
    nom: z.string({
        invalid_type_error: '',
        required_error: ''
    })
        .min(3, { message: "Le nom doit contenir au moins 3 caractères." })
        .max(50, { message: "Le nom ne doit pas dépasser 50 caractères." })
        .trim(),

    reference: z.string()
        .min(5, { message: "La référence doit contenir au moins 5 caractères." })
        .max(50, { message: "La référence ne doit pas dépasser 50 caractères." })
        .trim()
        .optional(),

    description: z.string()
        .min(10, { message: "La description doit contenir au moins 10 caractères." })
        .max(200, { message: "La description ne doit pas dépasser 200 caractères." })
        .trim()
        .optional(),

    categorie: z.string()
        .min(3, { message: "La catégorie doit contenir au moins 3 caractères." })
        .max(50, { message: "La catégorie ne doit pas dépasser 50 caractères." })
        .trim(),

    quantite: z.number()
        .int({ message: "La quantité doit être un entier." })
        .positive({ message: "La quantité doit être supérieure à 0." })
}).required();