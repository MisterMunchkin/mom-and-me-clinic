import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { DoctorInterface } from "@/interfaces/doctor";
import { DoctorClass } from "@/classes/doctor";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const serviceTags = searchParams.get("serviceTags");

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/doctors.json', 'utf8');

  const doctors = JSON.parse(fileContents) as DoctorInterface[];
  let doctorClasses = doctors.map(doctor => DoctorClass.fromInterface(doctor));

  if (serviceTags) {
    doctorClasses = filterDoctors(doctorClasses, DoctorClass.getSplittedTags(serviceTags));
  }

  return NextResponse.json<DoctorClass[]>(doctorClasses, {status:200});
}

function filterDoctors(doctors: DoctorClass[], serviceTags: string[]) {
  return doctors.filter(doctor => 
    serviceTags.some(tag => doctor.serviceTags.includes(tag))  
  );
}