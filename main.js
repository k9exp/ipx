import Fastify from "fastify";
import middlewareSupport from "@fastify/express";
import {
  createIPX,
  createIPXNodeServer,
  ipxFSStorage,
  ipxHttpStorage,
} from "ipx";

const server = Fastify({
  logger: true,
});

await server.register(middlewareSupport);

const ipx = createIPX({
  storage: ipxFSStorage({ dir: "./public" }),
  httpStorage: ipxHttpStorage({
    domains: ["i.imgur.com"],
  }),
  alias: {
    "/imgur": "https://i.imgur.com",
  },
});

server.use("/", createIPXNodeServer(ipx));

server.listen({ port: 3000 });
