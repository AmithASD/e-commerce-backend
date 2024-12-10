import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController.js';

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);

export default router;
