import createServer from "@tomphttp/bare-server-node";
import http from "http";
import express from "express";
import serve from "express-static";
const bare = createServer("/bare/");

const server = http.createServer();

const app = express();
 
app.use(express.static('static/'))

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req, socket, head)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: process.env.PORT || 8080,
});
