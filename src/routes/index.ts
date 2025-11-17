import { Router } from "express";
import { changePassword, deleteUser, getUser, login, register, updateUser } from "../modules/auth/auth.controller";

const router = Router();

//AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/changePassword", changePassword);
//CRUD
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;