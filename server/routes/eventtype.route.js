import express from 'express';
import { createEventType, getEventTypes } from "../controllers/eventtype.controller.js";

const router = express.Router();

router.get("/getEventTypes", getEventTypes);
router.post("/createEventType", createEventType);

export default router;