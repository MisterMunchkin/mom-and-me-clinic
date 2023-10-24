import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/appointment')) {
  //   return NextResponse.rewrite(new URL('/appointment-coming-soon', request.url));
  // }

  // once appointment is ready, we should create a checker to make sure that booking confirmed
  // is only accessed when appointment is truly created, maybe we can check the booking ID.
  if (request.nextUrl.pathname.startsWith('/appointment/booking-confirmed')) {
    return NextResponse.rewrite(new URL('/appointment-coming-soon', request.url));
  }
}