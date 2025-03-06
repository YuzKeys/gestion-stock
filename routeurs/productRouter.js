import { Router } from 'express';
import productController from '../controlleurs/product.controller.js';

const productRouter = Router();


//GET PRODUCT
productRouter.route('/')
    .get(productController.getAllProducts).post(productController.addNewProduct)
export default productRouter;    