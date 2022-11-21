import { IPermission } from "../../../constants/global";

export interface ILoginResponse {
  token: string;
  email: string;
  role: string;
  name:string;
  roleLevel:number;
  permissions:IPermission[];
}
