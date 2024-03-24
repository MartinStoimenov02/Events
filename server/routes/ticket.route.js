import express from 'express';
import { createTicket, getTickets, getActiveTicketsByEventId, updateTickets } from "../controllers/ticket.controller.js"

const router = express.Router();

router.get("/getTickets", getTickets);
router.post("/createTicket", createTicket);
router.get("/getActiveTicketsByEventId/:eventId/:placeId", getActiveTicketsByEventId);
router.put("/updateTickets", updateTickets);

export default router;