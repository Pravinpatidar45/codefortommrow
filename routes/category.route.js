import express from "express"
import { addCategory, addServices, deleteCategory, deleteServiceforCategory, updateCategory, updateServicePrice, viewCategories, viewServicesforCategory } from "../controllers/category.controller.js";
import { tokenVerification } from "../middleware/tokenverification.js";
const router=express.Router();
router.post("/category",tokenVerification(),addCategory);
router.get("/categories",tokenVerification(),viewCategories);
router.put("/category/:categoryId",tokenVerification(),updateCategory);
router.delete("/category/:categoryId",tokenVerification(),deleteCategory);
router.post("/category/:categoryId/service",tokenVerification(),addServices);
router.get("/category/:categoryId/services",tokenVerification(),viewServicesforCategory)
router.delete("/category/:categoryId/service/:serviceId",tokenVerification(),deleteServiceforCategory)
router.put("/category/:categoryId/service/:serviceId",tokenVerification(),updateServicePrice)
export default router;
