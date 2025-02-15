import { Router } from "express";
import authJWT from "../middlewares/auth";
import { authRouter, userRouter, productRouter } from "./index";


const router: Router = Router();

router.use("/auth", authRouter);
router.use("/products", authJWT,productRouter);
router.use("/users", authJWT, userRouter);

export default router;