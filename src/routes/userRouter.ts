import { Router } from "express";
import UserController from "../controllers/userController";

export const userRouter: Router = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.get("/:id/products", UserController.getUserWithProducts);
userRouter.get("/:id/product", UserController.getUserWithSpecificProducts);