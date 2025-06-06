import { RequestHandler, Router } from "express";
import { createProduct, deleteProduct, getProductById, readProducts, updateProduct } from "../controllers/product.controllers.js";
import validateProduct from "../helpers/validateProduct.js";

const productsRouter = Router()

productsRouter.route("/products").get(readProducts as RequestHandler).post(validateProduct, createProduct as RequestHandler);
productsRouter.route("/products/:id").get(getProductById as RequestHandler).put(validateProduct, updateProduct as RequestHandler).delete(deleteProduct as RequestHandler);

export default productsRouter;