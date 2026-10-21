export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { status: "ok", service: "futera", check: "liveness" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
