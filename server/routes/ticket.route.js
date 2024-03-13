import express from 'express';
import { createTicket, getTickets } from "../controllers/ticket.controller.js"

const router = express.Router();

router.get("/getTickets", getTickets);
router.post("/createTicket", createTicket);

export default router;