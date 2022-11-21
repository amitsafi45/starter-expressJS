import authService from "../../services/auth/auth.service";
import { LoginDTO } from "../../dtos/auth/auth.dto";
import { StatusCodes } from "../../constants/statusCodes";
import { NextFunction, Request, Response } from "express";
import messages from "../../constants/messages";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const data = await authService.login(req.body as LoginDTO);

    res.status(StatusCodes.SUCCESS).json({
        success: true,
        data,
        message: messages["validLogin"]
    });


}