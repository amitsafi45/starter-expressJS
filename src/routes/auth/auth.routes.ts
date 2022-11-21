import { LoginDTO } from "../../dtos/auth/auth.dto";
import { Router } from "express";
import RequestValidator from "../../middlewares/RequestValidator";

import { login } from "../../controllers/auth/auth.controller";
import { catchAsync } from "../../utils/catchAsync";

const router = Router();

router.post("/login", RequestValidator.validate(LoginDTO), catchAsync(login));

export default router;