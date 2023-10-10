import jwt from "jsonwebtoken"
import {AuthReqHandler, JWTBody} from "./auth_types"
import {canAccessReptile} from "./helperFunctions"

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
    if (!canAccessReptile(req.body, jwtBody)) {
      return res.status(401).json({message: "Unauthorized to access reptile"})
    }
    next()
  } catch (error) {
    res.status(401).json({message: "Unauthorized"})
  }
  return null
}
