import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { DoctorInterface } from "@/shared/interfaces/doctor";
import { DoctorClass } from "@/shared/classes/doctor";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const serviceTags = searchParams.get("serviceTags");

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/doctors.json', 'utf8');

  let doctors = JSON.parse(fileContents) as DoctorInterface[];

  if (serviceTags) {
    doctors = filterDoctors(doctors, DoctorClass.getSplittedTags(serviceTags));
  }

  return NextResponse.json<DoctorInterface[]>(doctors, {status:200});
}

function filterDoctors(doctors: DoctorInterface[], serviceTags: string[]) {
  return doctors.filter(doctor => 
    serviceTags.some(tag => doctor.serviceTags.includes(tag))  
  );
}