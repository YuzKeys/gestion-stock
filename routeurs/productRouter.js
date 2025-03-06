import { Router } from 'express';
import productController from '../controlleurs/product.controller.js';
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validation.middleware.js";
import { ProductSchema } from "../validators/product.validator.js";
const productRouter = Router();


// GET ET POST SUR /API/PRODUCT
productRouter.route('/')
    .get(paginationMiddleware({ maxLimit: 100 }), productController.getAllProducts)
    .post(bodyValidatorMiddleware(ProductSchema), productController.addNewProduct)

// GET PRODUCT DETAIL ET DELETE PRODUCT BY ID SUR /API/PRODUCT/ID
productRouter.route('/:id')
    .get(productController.getProductDetailById)


export default productRouter;    