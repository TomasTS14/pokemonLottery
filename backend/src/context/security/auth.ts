import { NextFunction, Request, Response } from "express";

import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Appuser from "./../../appuser/domain/Appuser";
import Message from "../responses/Message";
const SECRET_KEY: Secret = "mySecretKey";

const createToken = (appuser: Appuser): string => {

  const payload = {
    appuser: {
      id: appuser.id,
      name: appuser.name,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      req.body.auth = decoded.appuser;
      next();
    }
  } catch (err) {
    console.error(err);
    const message: Message = {
      text: "No autorizado",
    };
    response.status(401).json(message);
  }
};

//NO IMPLEMENTADO
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.auth.role && req.body.auth.role == "admin") {
      next();
    }
  } catch (err) {
    console.error(err);
  }
}

export { createToken, isAuth, isAdmin };
