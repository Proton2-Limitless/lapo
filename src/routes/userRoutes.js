import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  logginUser
} from "../controllers/userController.js";
import {
  validateLogginUser,
  validateUser,
} from "../middlewares/inputValidator.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.post("/login", validateLogginUser, logginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
