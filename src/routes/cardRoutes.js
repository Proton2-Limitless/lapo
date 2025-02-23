import { requestCard, getAllCard } from "../controllers/cardRequestController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import express from "express";
import { validateCardRequest } from "../middlewares/inputValidator.js";

const router = express.Router();

router.use(authMiddleware(["user"]));
router.post("/", validateCardRequest, requestCard);
router.get("/", getAllCard);

export default router;
