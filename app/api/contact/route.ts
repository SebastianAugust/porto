import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form endpoint. Validates server-side, drops honeypot hits silently,
 * and delivers the message via Resend. Never trusts the client.
 *
 * Required env (see .env.example):
 *   RESEND_API_KEY    — your Resend API key
 *   CONTACT_TO_EMAIL  — where messages are delivered (your inbox)
 *   CONTACT_FROM_EMAIL — verified sender, or "onboarding@resend.dev" for testing
 */

// Simple, pragmatic email check — good enough for a contact form; the real
// validation is "did Resend accept it".
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    name = "",
    email = "",
    message = "",
    // Honeypot: a hidden field real users never fill. If it has a value, it's a bot.
    company = "",
  } = (body ?? {}) as Record<string, string>;

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  // Server-side validation.
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }
  if (cleanName.length > 100 || cleanEmail.length > 200 || cleanMessage.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Misconfiguration is a server problem, not the visitor's fault.
    console.error("Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL env.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: cleanEmail,
      subject: `Portfolio message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
