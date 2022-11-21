import bcrypt from "bcryptjs";

class Bcrypt {
  private saltRounds: number = 10;

  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default new Bcrypt();
