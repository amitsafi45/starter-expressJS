import Admin from "../../entities/admin/admin.entity";
import appDataSource from "../../config/database.config";
import { LoginDTO } from "../../dtos/auth/auth.dto";
import HttpException from "../../utils/HttpException";
import messages from "../../constants/messages";
import bcryptService from "../utilities/bcrypt.service";
import TokenService from "../utilities/token.service";
import { Body, Post, Route, Tags } from "tsoa";
import { ILoginResponse } from "./types/response";


class AuthService {
  constructor(private adminRepository = appDataSource.getRepository(Admin)) {}

  /**
   *  @summary Login admin with the credentials
   */
  async login( data: LoginDTO): Promise<ILoginResponse> {
    const admin = await this.adminRepository.findOne({
      select: [
        "id",
        "password",
        "name",
        "email",
        "role",
        "permissions",
        "roleLevel",
      ],
      where: {
        email: data.email,
      },
    });


    if (!admin) {
      throw HttpException.badRequest(messages["invalidAuth"]);
    }

    const isCorrectPassword = await bcryptService.comparePassword(
      data.password,
      admin.password
    );

    if (!isCorrectPassword) {
      throw HttpException.badRequest(messages["invalidAuth"]);
    }

    const token = TokenService.sign({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
      roleLevel: admin.roleLevel,
    });
    
    return {
      token,
      email: admin.email,
      role: admin.role,
      name:admin.name,
      permissions:admin.permissions,
      roleLevel:admin.roleLevel
    };
  }
}

export default new AuthService();
