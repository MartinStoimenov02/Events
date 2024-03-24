import express from 'express';
import { getPlaces, createPlace, getPlaceById } from "../controllers/place.controller.js"

const router = express.Router();

router.get("/getPlaces", getPlaces);
router.get("/getPlaceById/:placeId", getPlaceById);
router.post("/createPlace", createPlace);

export default router;