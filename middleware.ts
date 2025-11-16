import { NextResponse, type NextRequest } from "next/server";
import { authRoutes, LOGIN_REDIRECT, protectedRoutes } from "./routes";
import { getUser } from "./actions/getUser";
import { prisma } from "./lib/prisma";

export async function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.pathname;
  const session = await getUser();

  if (authRoutes.includes(currentUrl)) {
    return session
      ? NextResponse.redirect(new URL(LOGIN_REDIRECT, request.url))
      : NextResponse.next();
  }

  if (protectedRoutes.some((s) => currentUrl.startsWith(s)) && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const data = await prisma.workspace.findMany();

  if (currentUrl === "/workspace" && data.length >= 1) {
    return NextResponse.redirect(
      new URL(`/workspace/${data[0].id}`, request.url)
    );
  } else if (currentUrl === "/workspace" && data.length < 1) {
    return NextResponse.redirect(new URL("/new", request.url));
  }
  if (currentUrl === "/" && session) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return NextResponse.next();
}

export const config = {
  //allows us to fetch user in middleware
  runtime: "nodejs",
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
