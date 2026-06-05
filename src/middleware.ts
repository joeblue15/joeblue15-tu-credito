import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || new URL(request.url).host;
  if (host === "tucredito.store" || host === "www.tucredito.store" || host === "tu-credito-rd.web.app" || host === "tucredito.me") {
    const url = new URL(request.url);
    url.host = "tutarjetard.com";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
