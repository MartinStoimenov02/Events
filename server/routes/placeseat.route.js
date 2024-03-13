import express from 'express';
import { createPlaceSeat, getPlaceSeats } from "../controllers/placeseat.controller.js"

const router = express.Router();

router.get("/getPlaceSeats", getPlaceSeats);
router.post("/createPlaceSeat", createPlaceSeat);

export default router;