// Liveness check for the platform. No database call: a database outage should not restart the web.
export function GET() {
  return Response.json({ ok: true });
}
