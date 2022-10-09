import express from "express";
import compression from "compression";
import connectdb from "./database";

const router = express();

// connect to mongo database using mongoose
connectdb();

router.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
  next();
});

// parse json data from request body
router.use(express.json({
  limit: "100kb"
}));

// use compression on requests
router.use(compression({
  level: 2
}));

// route to controllers here TODO

export default router;