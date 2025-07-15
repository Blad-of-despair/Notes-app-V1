import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/authMiddleware";
import Note from "@/models/Note";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { id } = verifyToken(req);
    const { id: noteId } = await params;
    const note = await Note.findOne({ _id: noteId, userId: id });
    if (!note) {
      return new Response(JSON.stringify({ error: "Note not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = verifyToken(req);
    const { id: noteId } = await params;
    const { title, content } = await req.json();
    const updated = await Note.findOneAndUpdate(
      { _id: noteId, userId: id },
      { title, content },
      { new: true }
    );
    if (!updated) {
      return new Response(JSON.stringify({ error: "Note not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = verifyToken(req);
    const { id: noteId } = await params;
    const deleted = await Note.findOneAndDelete({ _id: noteId, userId: id });
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Note not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Note deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }
}
