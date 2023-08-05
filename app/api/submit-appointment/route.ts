import { AppointmentRequestTemplate } from "@/emails/appointment-request";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { AppointmentSubmitRequest } from "@/classes/appointment-submit-request";

// https://www.kirandev.com/next-js-react-email-sending
// https://react.email/docs/getting-started/automatic-setup
// https://nodemailer.com/about/
// https://forwardemail.net/en

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASS || "password",
  },
}

const transporter = nodemailer.createTransport({
  ...smtpOptions
});

export async function POST(request: NextRequest) {
  const invalidResponse = isInvalidRequest(request);
  if (invalidResponse) {
    return invalidResponse;
  }

  const requestForm = await request.json() as AppointmentSubmitRequest;
  const invalidFormResponse = isInvalidForm(requestForm);
  if (invalidFormResponse) {
    return invalidFormResponse;
  }

  //submit email
  await transporter.sendMail({
    to: requestForm.doctorEmail,
    subject: `Appointment Request for ${requestForm.patientFullName}`,
    html: render(AppointmentRequestTemplate({
      patientFullName: requestForm.patientFullName,
      patientDateOfBirth: requestForm.patientDateOfBirth,
      patientPhoneNumber: requestForm.patientPhoneNumber,
      patientSex: requestForm.patientSex,
      patientMedicalConcern: requestForm.patientMedicalConcern,
      doctorFullName: requestForm.doctorFullName,
      selectedService: requestForm.selectedService,
      preferredSchedule: requestForm.preferredSchedule,
      location: requestForm.location
    }))
  });

  return NextResponse.json('Appointment request submitted!', {status: 200, statusText: 'Submitted successfully'});
}

function isInvalidRequest(request: NextRequest): NextResponse | null {
  const allowedOriginString = process.env.ALLOWED_ORIGINS || '';
  if (!allowedOriginString) { // env variable not set
    return NextResponse.json(null, {status: 500, statusText: 'Not able to handle submissions at this time, please refresh and try again.'});
  }

  const origin = request.headers.get('origin') || request.headers.get('referer') || '';
  const allowedOriginArray = allowedOriginString.split(',');

  if (!allowedOriginArray.includes(origin)) { // request came from unknown origin
    return NextResponse.json(null, {status: 403, statusText: 'Unauthorized Access'});
  }

  return null;
}

function isInvalidForm(requestForm: AppointmentSubmitRequest): NextResponse | null {
  if (requestForm.honeyPotEmail) { // caught a bot
    return NextResponse.json(null, {status: 200});
  }

  const requiredProperties = Object.keys(requestForm).filter((key) => key !== 'honeyPotEmail');

  //checks if the correct number of required props are declared on the request
  if (requiredProperties.length !== AppointmentSubmitRequest.numOfRequiredProps) {
    return NextResponse.json(requestForm, {status: 500, statusText: `There are missing properties in the request object`});
  } 

  //checks if any required properties are empty
  const emptyProperties = requiredProperties
    .filter(key => !requestForm[key as keyof AppointmentSubmitRequest]);

  if (emptyProperties && emptyProperties.length > 0) {
    const joinedEmptyProperties = emptyProperties.join(', ');
    return NextResponse.json(requestForm, {status: 500, statusText: `${joinedEmptyProperties} cannot be empty`});
  }

  return null;
}