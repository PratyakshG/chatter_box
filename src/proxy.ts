import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  //extract the roomID from pathname
  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);

  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));
  const roomId = roomMatch[1];

  const meta = await redis.hgetall<{ connected: string; createdAt: number }>(
    `meta:${roomId}`,
  );

  //redirect with an error parameter to check afterwards
  if (!meta)
    return NextResponse.redirect(new URL("/?error=room-not-found", req.url));

  const existingToken = req.cookies.get("x-auth-token")?.value;

  //if allowed, let them pass
  if (existingToken && meta.connected.includes(existingToken)) {
    return NextResponse.next();
  }

  //if not allwoed redirect them to lobby
  if (meta.connected.length >= 2) {
    return NextResponse.redirect(new URL("/?error=room-full", req.url));
  }

  const response = NextResponse.next();

  const token = nanoid();

  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  });

  return response;

  //check if user is allowed to join the room
};

//matcher
export const config = {
  matcher: "/room/:path*",
};
