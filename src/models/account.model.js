import mongoose from "mongoose";

const AccountModel = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  hash: {type: String, required: true}
});

AccountModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model("accounts", AccountModel);