import { Request, Response } from "express";
import { findUserByUsername } from "../user/user.service";
import { StatusCodes } from "http-status-codes";
import { signJwt } from "./auth.utils";
import omit from "../../helpers/omit";
import { LoginSchemaBody } from "./auth.schema";
import { EventEnum } from "../events/event.model";
import { createEventLog } from "../events/event.service";

export async function loginHandler(
  req: Request<{}, {}, LoginSchemaBody>,
  res: Response
) {
  const { username, password } = req.body;

  // find user by email
  const user = await findUserByUsername(username);

  // check user exists - return error
  // verify user password
  // if wrong password - return error

  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid username or password");
  }

  // create sign-in eventLog
  await createEventLog(user, EventEnum.SignIn);

  // sign a jwt remove the password property
  const payload = omit(user.toJSON(), ["password", "__v"]);
  const jwt = signJwt(payload);

  // add a cookie to the response
  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false, // allow http
  });
  // respond
  return res.status(StatusCodes.OK).send(jwt);
}

export async function logoutHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    await createEventLog(user, EventEnum.SignOut);
    res.clearCookie("accessToken");
    return res.sendStatus(StatusCodes.OK);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
