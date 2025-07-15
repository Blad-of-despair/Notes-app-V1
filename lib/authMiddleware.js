import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const header = req.headers.get("authorization");
  if (!header) throw new Error("Missing auth header");

  const token = header.split(" ")[1];
  if (!token) throw new Error("Invalid token");

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error("Invalid token");
  }
}
