import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);             // visible for screen 
router.post("/add", authMiddleware, upload.single('image'), addEmployee);
router.get("/:id", authMiddleware, getEmployee);         // Fixed route for getting department by ID
router.put("/:id", authMiddleware, updateEmployee);     // Fixed route for updating department by ID
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId); 

export default router;
