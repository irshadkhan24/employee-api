import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, getDepartment); // Fixed route for getting department by ID
router.put("/:id", authMiddleware, updateDepartment); // Fixed route for updating department by ID
router.delete("/:id", authMiddleware, deleteDepartment); 

export default router;
