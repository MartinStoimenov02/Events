import express from 'express';
import { createPlaceSeat, getPlaceSeats, getPlaceSeatsByIds } from "../controllers/placeseat.controller.js"

const router = express.Router();

router.get("/getPlaceSeats", getPlaceSeats);
router.post("/createPlaceSeat", createPlaceSeat);
router.post("/getPlaceSeatsByIds", getPlaceSeatsByIds);

export default router;