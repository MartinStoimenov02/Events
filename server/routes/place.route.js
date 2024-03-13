import express from 'express';
import { getPlaces, createPlace } from "../controllers/place.controller.js"

const router = express.Router();

router.get("/getPlaces", getPlaces);
router.post("/createPlace", createPlace);

export default router;