import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { ServerToClientEvents, ClientToServerEvents } from "../../src/socket";

export type DefaultSocketClient = Socket<DefaultEventsMap, DefaultEventsMap>;

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;
