import { verifyToken } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No token" }), { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  const user = await User.findById(decoded.id).select("email");
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ email: user.email }), { status: 200 });
}
