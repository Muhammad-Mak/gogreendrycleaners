import { NextResponse } from "next/server";

/**
 * Placeholder handler. Logs the submission and returns success.
 * Wire this to Resend / SendGrid / a webhook in production.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic shape validation — just enough to prevent garbage
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const submission = {
      receivedAt: new Date().toISOString(),
      source: typeof body.source === "string" ? body.source : "unknown",
      payload: body,
    };

    console.log("[messages]", JSON.stringify(submission, null, 2));

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse request", detail: String(err) },
      { status: 400 }
    );
  }
}
