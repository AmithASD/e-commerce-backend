import express from 'express';
import { deleteProduct, getProdustcs , addProduct, orderProduct, saveProduct} from '../controllers/ProductsController.js';
import { CheckAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.post("/save-product", saveProduct, CheckAuth);
router.get("/get-products", getProdustcs,CheckAuth);
router.delete("/delete-product", deleteProduct, CheckAuth);
router.post("/add-cart-product", addProduct, CheckAuth);
router.post("/order-product", orderProduct, CheckAuth);

export default router;
