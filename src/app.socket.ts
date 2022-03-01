import { startWs } from "./socket";
import app from "./app";

export const ws = startWs(app);
export default app;
