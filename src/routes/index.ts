/**
 *
 */
import { Request, Response, Router } from "express";
import auth from "./auth";
import { getRepository } from "typeorm";
import User from "../entity/User";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME);
});

routes.get("/test", (req: Request, res: Response) => {
  res.send("hello test");
});

routes.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.send("hello error");
});

routes.use("/auth", auth);

// users
routes.get("/users", async function (req: Request, res: Response) {
  try {
    const users = await getRepository(User).find({
      relations: ["photos", "profile"],
    });
    return res.json(users);
  } catch (e) {
    return res.json({})
  }
});

routes.get("/users/:id", async (req: Request, res: Response) => {
  const results = await getRepository(User).findOne(req.params.id);
  return res.send(results);
});

routes.post("/users", async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  } catch (e) {
    return res.json({ message: e.message })
  }
});

routes.put("/users/:id", async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(req.params.id);
  let results: User | null = null;
  if (user instanceof User) {
    userRepository.merge(user, req.body);
    results = await userRepository.save(user);
  }
  return res.send(results);
});

routes.delete("/users/:id", async (req: Request, res: Response) => {
  const results = await getRepository(User).delete(req.params.id);
  return res.send(results);
});

export default routes;
