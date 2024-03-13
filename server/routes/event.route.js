import express from 'express';
import { createEvent, getActiveEvents, getEventById, getEvents } from "../controllers/event.controller.js"

const router = express.Router();

router.get("/getEvents", getEvents);
router.get("/getEventById/:eventId", getEventById);
router.get('/getActiveEvents', getActiveEvents);
router.post("/createEvent", createEvent); 

export default router;