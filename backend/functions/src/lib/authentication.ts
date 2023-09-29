import jwt from "jsonwebtoken"
import {AuthReqHandler, JWTBody} from "./auth_types"

export const authenticationMiddleware: AuthReqHandler = async (
  req,
  res,
  next
) => {
  // console.log("PATH", req.baseUrl);
  const token = req.headers.authorization?.split(" ")[1]
  try {
    const jwtBody = jwt.verify(
      token || "",
      process.env.ENCRYPTION_KEY!
    ) as JWTBody
    req.jwtBody = jwtBody
    next()
  } catch (error) {
    res.status(401).json({message: "Unauthorized"})
  }
}
