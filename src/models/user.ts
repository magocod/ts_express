import bcrypt from "bcrypt";

export interface BasicUser {
  id: number;
  email: string;
  password: string;
}

const users: BasicUser[] = [
  {
    id: 1,
    email: "a@domain.com",
    password: "123",
  },
  {
    id: 2,
    email: "b@domain.com",
    password: "1234",
  },
];

export default class User {
  /**
   *
   * @param id
   */
  static async find(id: number): Promise<BasicUser> {
    const user = users.find((u) => {
      return u.id === id;
    });
    if (user === undefined) {
      throw new Error("user not exist");
    }
    return user;
  }

  /**
   *
   * @param email
   */
  static async findEmail(email: string): Promise<BasicUser> {
    const user = users.find((u) => {
      return u.email === email;
    });
    if (user === undefined) {
      throw new Error("user not exist");
    }
    return user;
  }

  /**
   *
   * @param user
   */
  static async create(user: BasicUser): Promise<BasicUser> {
    user.id = users.length + 1;
    user.password = await bcrypt.hash(user.password, 10);
    users.push(user);
    return user;
  }

  /**
   *
   * @param user
   * @param password
   */
  static comparePassword(user: BasicUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
