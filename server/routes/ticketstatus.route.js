import express from 'express';
import { createTicketStatus, getTicketStatuses } from "../controllers/ticketstatus.controller.js"

const router = express.Router();

router.get("/getTicketStatuses", getTicketStatuses);
router.post("/createTicketStatus", createTicketStatus);

export default router;