// TODO config auth

export interface BasicUser {
  email: string;
  password: string;
}

const users: BasicUser[] = [
  {
    email: "a@domain.com",
    password: "123",
  },
  {
    email: "b@domain.com",
    password: "1234",
  },
];

export default class User {
  /**
   *
   * @param email
   */
  static async find(email: string): Promise<BasicUser> {
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
  static create(user: BasicUser): void {
    users.push(user);
  }
}
