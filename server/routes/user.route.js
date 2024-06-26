import express from 'express';
import {createUser, getUsers} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/createUser", createUser);

export default router;