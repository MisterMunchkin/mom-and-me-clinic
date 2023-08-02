import { AppointmentFormMTInterface } from "@/interfaces/appointment";
import { NextResponse } from "next/server";

export const submitAppointmentRequest = async (appointmentForm: AppointmentFormMTInterface) => {
  try {
    const response = await fetch('/api/submit-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentForm)
    }) as NextResponse;

    if (response.status !== 200) {
      let body = await response.json();
      throw new Error(body);
    } 
     
    // handle success message
    console.log('successfully submitted');
  } catch (err) {
    //handle error message
    console.error(err);
  }
}