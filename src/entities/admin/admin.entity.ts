import { roles } from "../../constants/roles";
import {
  Entity,
  Column,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import bcrypt from "../../services/utilities/bcrypt.service";
import Print from "../../utils/Print";
import messages from "../../constants/messages";
import { IPermission } from "../../constants/global";


export enum RoleLevels {
  SUPER_ADMIN = -1,
  USER=0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,

}

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: roles,
  })
  role: roles;

  @Column({
    name: "role_level",
    type: "enum",
    enum: RoleLevels,
  })
  roleLevel: RoleLevels;

  @Column("json", {
    name: "permissions",
    nullable: true,
  })
  permissions: IPermission[];

  @CreateDateColumn({ name: "created_at", select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", select: false })
  deletedAt: Date;

  

  // * This approach is done to ensure that password is not hashed again and again
  private tempPassword!: string;

  @AfterLoad()
  private loadPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password !== this.tempPassword) {
      try {
        this.password = await bcrypt.hashPassword(this.password);
      } catch (error: any) {
        Print.error(error.toString());
        throw new Error(messages["serverError"]);
      }
    }
  }

  
}

export default Admin;
