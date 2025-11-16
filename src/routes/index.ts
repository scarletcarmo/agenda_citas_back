import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";

const router = Router();
const controller = new AuthController();

//AUTH
router.post("/register", controller.register.bind(controller));
router.post("/login", controller.login.bind(controller));
//CRUD
router.get("/:id", controller.getUser.bind(controller));
router.put("/:id", controller.updateUser.bind(controller));
router.delete("/:id", controller.deleteUser.bind(controller));

export default router;