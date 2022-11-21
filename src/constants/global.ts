import { EntityTarget, ObjectLiteral } from "typeorm";

export enum Permission {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  UPDATE = "update",
  ACTION = "action",
  ALL = "all",
}
export interface IPermission {
  project: String;
  permissions: Permission[];
}


export interface IEntityName {
  [key: string]: EntityTarget<ObjectLiteral>;
}

export interface IRelationsInterface {
  [key: string]: string[];
}
