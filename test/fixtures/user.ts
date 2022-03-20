import faker from "faker";

import { Profile, User } from "../../src/entity";
import { Connection } from "typeorm";

import { chance } from "./index";

interface GenerateTestUser {
  user: User;
  profile: Profile;
}

/**
 *
 * @param connection
 */
export async function generateUser(
  connection: Connection
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
  });

  const user = await userRepository.save(userBase);

  return { user, profile };
}
