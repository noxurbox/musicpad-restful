import jwt from "jsonwebtoken";
import crypto from "crypto";

// import models
import accessKeyModel from "../models/accessKey.model";
import refreshKeyModel from "../models/refreshKey.model";

class AuthService {

  // generate tokens
  async genTokens (userid) {

    const accessKey = await crypto.randomBytes(250).toString("hex");

    const refreshKey = await crypto.randomBytes(350).toString("hex");

    try {

      const newAccessKey = new accessKeyModel({
        key: accessKey,
        user: userid
      });
  
      const savedAccessKey = await newAccessKey.save();

      const newRefreshKey = new refreshKeyModel({
        key: refreshKey,
        user: userid
      });

      const savedRefreshKey = await newRefreshKey.save();

      const access_token = jwt.sign({
        user: userid,
      }, accessKey, {
        expiresIn: 60*60*7,
        keyid: savedAccessKey.id
      });

      const refresh_token = jwt.sign({
        user: userid
      }, refreshKey, {
        expiresIn: 60*60*24*16,
        keyid: savedRefreshKey.id
      });

      let dt = new Date();
      dt.setSeconds(dt.getSeconds() + (60*60*7));

      return {
        access_token,
        refresh_token,
        expires_at: dt.getTime()
      }

    } catch (err) {
      throw err;
    }

  }

}

export default new AuthService();