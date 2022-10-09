import mongoose from "mongoose";

const refreshKeyModel = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, required: true, ref: "accounts"},
  key: {type: String, required: true},
  createdAt: { type: Date, expires: 60*60*24*16, default: Date.now }
});

refreshKeyModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model("refresh_keys", refreshKeyModel);