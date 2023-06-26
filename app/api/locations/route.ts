import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { LocationInterface } from "@/interfaces/locations";

export async function GET(request: NextRequest) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/locations.json', 'utf8');

  const locations = JSON.parse(fileContents) as LocationInterface[];

  return NextResponse.json<LocationInterface[]>(locations, {status:200});
}