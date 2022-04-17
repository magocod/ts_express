import { faker } from "@faker-js/faker";

import { Profile, User, Role, Permission } from "../../src/entity";
import { DataSource } from "typeorm";

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
 * @param dataSource
 * @param config
 */
export async function generateUser(
  dataSource: DataSource,
  config: ConfigTestUser = {
    roles: [],
  }
): Promise<GenerateTestUser> {
  const profileRepository = dataSource.getRepository(Profile);
  const userRepository = dataSource.getRepository(User);

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
    roles: config.roles,
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

export async function generateRole(
  dataSource: DataSource,
  // config: {
  //   permissions: 0;
  // }
) {
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);

  const pA = permissionRepository.create({
    name: faker.datatype.uuid(),
  });
  await permissionRepository.save(pA);

  const role = roleRepository.create({
    name: faker.datatype.uuid(),
    permissions: [pA],
  });
  await roleRepository.save(role);

  const pB = permissionRepository.create({
    name: faker.datatype.uuid(),
  });
  await permissionRepository.save(pB);

  role.permissions.push(pB);
  await roleRepository.save(role);

  return { role }
}
