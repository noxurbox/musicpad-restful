import jwt from "jsonwebtoken";
import express from "express";
import argon2 from "argon2";
import authenticate from "../middleware";
import { BadRequestError, ServerError } from "../errors";

// import models
import accountModel from "../models/account.model";

// import validators
import { AccountCreationValidator, AccountLoginValidator, RefreshTokensValidator } from "../validators/auth.validator";
import authService from "../services/auth.services";
import refreshKeyModel from "../models/refreshKey.model";

export default () => {
 
  const api = express.Router();

  // Account Creation - POST "/_helix/auth/register"
  api.post("/register", async (req, res, next) => {

    const {error} = AccountCreationValidator.validate(req.body);

    if (error) return next(new BadRequestError(error.details[0].message));

    try {

      const emailExists = await accountModel.findOne({email: req.body.email});

      if (emailExists) return next(new BadRequestError("Email already registered."));

      const usernameExists = await accountModel.findOne({username: req.body.username});

      if (usernameExists) return next(new BadRequestError("Username already taken"));
      
      const hash = await argon2.hash(req.body.password, {type: argon2.argon2id, saltLength: 70});

      const newAccount = new accountModel({
        username: req.body.username,
        email: req.body.email,
        hash
      });

      const savedAccount = await newAccount.save();

      const tokens = await authService.genTokens(savedAccount.id);

      res.status(200).json(tokens);

    } catch (err) {
      console.error(err);
      next(new ServerError());
    }

  });

  // User Login - POST "/_helix/auth/tokens"
  api.post("/tokens", async (req, res, next) => {

    const {error} = AccountLoginValidator.validate(req.body);

    if (error) return next(new BadRequestError(error.details[0].message));

    try {
      
      const account = await accountModel.findOne({email: req.body.email});

      if (!account) return next(BadRequestError("Invalid email or password."));

      if (await argon2.verify(account.hash, req.body.password, {type: argon2.argon2id, saltLength: 70}) !== true) return next(new BadRequestError("Invalid email or password."));

      const tokens = await authService.genTokens(account.id);

      res.status(200).json(tokens);

    } catch (err) {
      console.error(err);
      next(new ServerError());
    }

  });

  // refresh auth tokens - POST "/_helix/auth/refresh"
  api.post("/refresh", async (req, res, next) => {
    
    const {error} = RefreshTokensValidator.validate(req.body);

    if (error) return next(new BadRequestError(error.details[0].message));

    try {
      
      const decoded = jwt.decode(req.body.refresh_token, {complete: true});

      const refreshKey = await refreshKeyModel.findOne({_id: decoded.header.kid});

      if (!refreshKey) return next(new BadRequestError("Invalid refresh token"));

      jwt.verify(req.body.refresh_token, refreshKey.key, async (err, decoded2) => {
        
        if (err) return next(new BadRequestError("Invalid refresh token"));

        await refreshKey.remove();

        const tokens = await authService.genTokens(decoded2.user);

        res.status(200).json(tokens);

      });

    } catch (err) {
      console.error(err);
    }

  });

  // check user
  api.get("/check", authenticate, async (req, res, next) => {

    res.status(200).json({code:200,message:res.locals.user});

  });

  return api;
  
}