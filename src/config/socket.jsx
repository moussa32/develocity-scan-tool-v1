import { io } from "socket.io-client";

export const socket = io("http://api.develocity.finance/", {
  extraHeaders: {
    ["my-auth"]: "abcd",
  },
});
