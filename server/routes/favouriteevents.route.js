import express from 'express';
import { createFavouriteEvent, getFavouriteEvents } from "../controllers/favouriteevents.controller.js"

const router = express.Router();

router.get("/getFavouriteEvents", getFavouriteEvents);
router.post("/createFavouriteEvent", createFavouriteEvent);

export default router;