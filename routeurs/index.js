import { Router } from 'express';
import productRouter from './product.router.js';
import authRouter from './auth.router.js';


const mainRouter = Router();

mainRouter.use('/product', productRouter)
mainRouter.use("/auth", authRouter);

export default mainRouter;