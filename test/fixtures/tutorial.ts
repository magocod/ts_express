import { chance } from "./index";
import { Document, Types } from "mongoose";

import { Tutorial, TutorialBase } from "../../src/models";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type TutorialDocument = Document<unknown, any, TutorialBase> &
  TutorialBase & { _id: Types.ObjectId };

type GenerateTutorial = Promise<{ tutorial: TutorialDocument }>

export async function generateTutorial(): GenerateTutorial {
  const tutorial = await Tutorial.create({
    title: chance.guid(),
    description: chance.guid(),
    published: chance.bool({ likelihood: 50 }),
  });

  return { tutorial };
}
