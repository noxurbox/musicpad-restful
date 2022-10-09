import http from "http";
import express from "express";
import config from "config";

// import errors
import { NotFoundError } from "./errors";

import router from "./router";

const app = express();

const server = http.createServer(app);

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
  next();
});

app.get("/_helix", (req, res) => {
  res.status(200).json({code:200,message:"OK"});
});

// use router
app.use("/_helix", router);

app.all("*", (req, res, next) => {
  next(new NotFoundError("Endpoint Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.code).json({code:err.code,error:err.error,message:err.message});
});

server.listen(config.get("port"), () => console.info(`Api now running on port ${config.get("port")}`));

export default app;