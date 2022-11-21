import { RoleLevels } from "../entities/admin/admin.entity";
import { roles } from "./roles";

const admins = [
    {
        name: "Super Admin",
        email: "superadmin@undp.org.np",
        password: "Admin@123",
        role: roles.SUPER_ADMIN,
        roleLevel: RoleLevels.SUPER_ADMIN
    },
    {
        name: "Admin 1",
        email: "admin1@undp.org.np",
        password: "Admin@123",
        role: roles.ADMIN,
        roleLevel: RoleLevels.ONE,
        
    },
    {
        name: "Admin 2",
        email: "admin2@undp.org.np",
        password: "Admin@123",
        role: roles.ADMIN,
        roleLevel: RoleLevels.TWO
    },
    {
        name: "Admin 3",
        email: "admin3@undp.org.np",
        password: "Admin@123",
        role: roles.ADMIN,
        roleLevel: RoleLevels.THREE
    },
    {
        name: "Admin 4",
        email: "admin4@undp.org.np",
        password: "Admin@123",
        role: roles.ADMIN,
        roleLevel: RoleLevels.FOUR
    },
]
export default admins;