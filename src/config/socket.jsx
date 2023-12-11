import { io } from "socket.io-client";

export const socket = io(
  "http://http://develocity-blockchain-stagging-production-c0d0.up.railway.app/",
  {
    extraHeaders: {
      ["my-auth"]: "abcd",
    },
  }
);
