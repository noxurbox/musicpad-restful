import mongoose from "mongoose";

const accessKeyModel = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, required: true, ref: "accounts"},
  key: {type: String, required: true},
  createdAt: { type: Date, expires: 60*60*7, default: Date.now }
});

accessKeyModel.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model("access_keys", accessKeyModel);