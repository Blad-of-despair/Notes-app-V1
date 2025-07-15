import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/authMiddleware";
import Note from "@/models/Note";

export async function GET(req) {
  await connectDB();

  try {
    const { id } = verifyToken(req);
    const notes = await Note.find({ userId: id });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const { id } = verifyToken(req);
    const { title, content } = await req.json();

    const newNote = await Note.create({
      userId: id,
      title,
      content,
    });

    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}
