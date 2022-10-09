import mongoose from "mongoose";
import config from "config";

const connectdb = async () => {

  try {
    await mongoose.connect(config.get("mongo"));
    console.info("Connected to database!!");
  } catch (err) {
    console.error("Unknown error while connecting to database");
  }

}

export default connectdb;