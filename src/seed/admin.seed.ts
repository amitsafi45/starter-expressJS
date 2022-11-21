import Print from "../utils/Print";
import appDataSource from "../config/database.config";
import admins from "../constants/admins";
import Admin from "../entities/admin/admin.entity";

appDataSource
  .initialize()
  .then(async (_) => {
    const adminRepository = appDataSource.getRepository(Admin);

    // *Iterate through super admin and insert into the database
    for (const element of admins) {
      const admin = new Admin();
      admin.name = element.name;
      admin.email = element.email;
      admin.role = element.role;
      admin.password = element.password;
      admin.roleLevel = element.roleLevel;
      await adminRepository.save(admin);
    }
  })
  .catch((err) => {
    Print.error(err);
  })
  .finally(() => {
    // *Finish the process
    appDataSource.destroy();
  });
