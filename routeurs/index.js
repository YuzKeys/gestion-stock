import { Router } from 'express';
import productRouter from './productRouter.js';


const mainRouter = Router();

mainRouter.use('/product', productRouter)

export default mainRouter;