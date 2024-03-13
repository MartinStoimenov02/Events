import express from 'express';
import {createRole, getRoles} from "../controllers/role.controller.js"

const router = express.Router();

router.get("/getRoles", getRoles);
router.post("/createRole", createRole);

export default router;