import { Router } from 'express';
import productController from '../controlleurs/product.controller.js';
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";
import { bodyValidatorMiddleware } from "../middlewares/body-validation.middleware.js";
import { verifyRoleMiddleware } from '../middlewares/role-verifier.middleware.js';
import { authenticateUserMiddleware } from '../middlewares/authenticate-user.middleware.js';
import { ProductSchema } from "../validators/product.validator.js";
const productRouter = Router();


productRouter.route('/')
    // GET SUR /API/PRODUCT (TOUS LE MONDE)
    .get(paginationMiddleware({ maxLimit: 100 }), productController.getAllProducts)
    // POST SUR /API/PRODUCT (ADMIN/MANAGER) => Authentification JWT => Si ADMIN OU MANAGER => Acces authorisé
    .post(verifyRoleMiddleware(["admin", "manager"]), bodyValidatorMiddleware(ProductSchema), productController.addNewProduct)


// GET PRODUCT DETAIL BY ID SUR /API/PRODUCT/ID (TOUS LE MONDE)
productRouter.route('/:id').get(productController.getProductDetailById)

// GET PRODUCT DETAIL BY ID SUR /API/PRODUCT/ID (TOUS LE MONDE)
productRouter.route('/:id').put(productController.updateProduct)

// exporter
export default productRouter;
