import faker from "faker";

import { Profile, User, Role } from "../../src/entity";
import { Connection } from "typeorm";

import { chance } from "./index";

import { generateToken } from "../../src/services/auth";

interface GenerateTestUser {
  user: User;
  profile: Profile;
  token: string;
}

interface ConfigTestUser {
  roles?: Role[];
}

/**
 *
 * @param connection
 */
export async function generateUser(
  connection: Connection,
  config: ConfigTestUser = {
    roles: [],
  }
): Promise<GenerateTestUser> {
  const profileRepository = connection.getRepository(Profile);
  const userRepository = connection.getRepository(User);

  const profileBase = profileRepository.create({
    name: faker.animal.fish(),
  });
  const profile = await profileRepository.save(profileBase);

  const userBase = userRepository.create({
    email: chance.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profile,
    password: "123",
    roles: config.roles
  });

  const user = await userRepository.save(userBase);

  const token = generateToken(user);

  return { user, profile, token };
}

/**
 *
 * @param tk
 */
export function generateAuthHeader(tk: string): string {
  return `Bearer ${tk}`;
}
