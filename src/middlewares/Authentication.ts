import { json, NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";
import { roles } from "../constants/roles";
import messages from "../constants/messages";
import TokenService from "../services/utilities/token.service";
import { StatusCodes } from "../constants/statusCodes";
import appDataSource from "../config/database.config";
import Admin from "../entities/admin/admin.entity";
import Print from "../utils/Print";

export default (userRole?: roles) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(HttpException.badRequest(messages["unAuthorized"]));
    }

    const data = authorization.trim().split(" ");

    if (data.length !== 2 || data[0] !== "Bearer") {
      next(HttpException.badRequest(messages["unAuthorized"]));
    }

    const token = data[1];

    try {
      const data = TokenService.verify(token);
      const { id, email, role ,name,roleLevel} = data;

      const user = await appDataSource.getRepository(Admin).findOne({
        where: {
          id,
        },
      });


      if (!user || (userRole && role !== userRole)) {
        Print.error("User not found or Role not matched");
        return next(HttpException.unauthorized(messages["unAuthorized"]));
      }
      // *Authenticating the user

      req.user = user;
      next();
    } catch (err: any) {
      Print.error(err.toString());
      return next(
        new HttpException(messages["unAuthorized"], StatusCodes.BAD_REQUEST)
      );
    }
  };
