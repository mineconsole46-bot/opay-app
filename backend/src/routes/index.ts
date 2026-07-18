import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bankingRouter from "./banking";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bankingRouter);

export default router;
