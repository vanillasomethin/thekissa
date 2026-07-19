import { NextRequest, NextResponse } from "next/server";

// Protects the admin UI and the case-study write endpoints with HTTP Basic Auth.
// Set ADMIN_PASSWORD (and optionally ADMIN_USER, default "admin") in env.
export function proxy(req: NextRequest) {
  // Public reads of the manifest stay open so the site can render.
  if (req.nextUrl.pathname === "/api/case-studies" && req.method === "GET") {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  const user = process.env.ADMIN_USER || "admin";

  // If no password is configured, refuse rather than expose the admin openly.
  if (!password) {
    return new NextResponse(
      "Admin is locked: set ADMIN_PASSWORD in the environment to enable it.",
      { status: 503 }
    );
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(":");
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    if (u === user && p === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Kissa Admin", charset="UTF-8"' },
  });
}

export const config = {
  // Gate the admin UI and the write APIs. Public GET of /api/case-studies
  // stays open so the site can render case studies.
  matcher: ["/admin/:path*", "/api/case-studies", "/api/case-studies/upload"],
};
