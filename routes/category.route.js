import express from "express"
import { addCategory, addServices, deleteCategory, deleteServiceforCategory, updateCategory, updateServicePrice, viewCategories, viewServicesforCategory } from "../controllers/category.controller.js";
const router=express.Router();
router.post("/category",addCategory);
router.get("/categories",viewCategories);
router.put("/category/:categoryId",updateCategory);
router.delete("/category/:categoryId",deleteCategory);
router.post("/category/:categoryId/service",addServices);
router.get("/category/:categoryId/services",viewServicesforCategory)
router.delete("/category/:categoryId/service/:serviceId",deleteServiceforCategory)
router.put("/category/:categoryId/service/:serviceId",updateServicePrice)
export default router;