import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { PersistedGlobalState } from './store';
import { Pages } from "./constants/pages.constant";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  //   const cookies: PersistedGlobalState = JSON.parse(request.cookies.get('global')?.value || JSON.stringify({ state: {} })).state;
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  if (pathname == "/") {
    return NextResponse.redirect(new URL(Pages.FLIGHTS, request.url));
  }

  return response;
};

// Match all request paths except for the ones starting with, api (API routes), _next/static (static files), _next/image (image optimization files), favicon.ico (favicon file)
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
