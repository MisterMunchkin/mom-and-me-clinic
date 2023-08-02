import { AppointmentFormMTInterface } from "@/interfaces/appointment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  debugger
  const allowedOriginString = process.env.ALLOWED_ORIGINS || '';
  if (!allowedOriginString) { // env variable not set
    return NextResponse.json(null, {status: 500, statusText: 'Not able to handle submissions at this time, please refresh and try again.'});
  }

  const origin = request.headers.get('origin') || request.headers.get('referer') || '';
  const allowedOriginArray = allowedOriginString.split(',');

  if (!allowedOriginArray.includes(origin)) { // request came from unknown origin
    return NextResponse.json(null, {status: 403, statusText: 'Unauthorized Access'});
  }

  const body = await request.json() as AppointmentFormMTInterface;
  if (body.personalDetails?.honeyPotEmail) { // caught a bot
    return NextResponse.json(null, {status: 200});
  }

  //submit email

  return NextResponse.json('Appointment request submitted!', {status: 200, statusText: 'Submitted successfully'});
}