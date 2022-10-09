import jwt from "jsonwebtoken";
import accessKeyModel from "./models/accessKey.model";

const authenticate = async (req, res, next) => {

  const header = req.headers["authorization"];

  const token = header.split(" ")[1];

  if (header.startsWith("Bearer")) {

    const decoded = jwt.decode(token, {complete: true});

    const accessKey = await accessKeyModel.findOne({_id: decoded.header.kid});

    if (!accessKey) return res.status(401).json({code:401,error:"Unauthenticated.",message:"Invalid token"});

    jwt.verify(token, accessKey.key, async (err, decoded2) => {

      if (err) return res.status(401).json({code:401,error:"Unauthenticated.",message:"Invalid token"});

      res.locals.user = decoded2.user;

      next();

    });

  } else {
    res.status(401).json({code:401,error:"Unauthenticated.",message:"Invalid token"});
  }

};

export default authenticate;