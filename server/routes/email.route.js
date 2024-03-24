import express from 'express';
import { useSendEmail } from "../controllers/email.controller.js"

const router = express.Router();

router.post("/sendEmail", useSendEmail);

export default router;