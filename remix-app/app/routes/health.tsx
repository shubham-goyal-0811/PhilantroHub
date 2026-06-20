import type { Route } from "./+types/health";
import { connectDb } from "~/lib/db.server";
export async function loader() {
  try {
    const conn = await connectDb();
    return Response.json({
      status: "ok",
      db: "connected",
      host: conn.connection.host,
    });
  } catch (err) {
    return Response.json(
      {
        status: "error",
        db: "disconnected",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}

export default function Health({ loaderData }: Route.ComponentProps) {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>Health</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </main>
  );
}
