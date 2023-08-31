import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { LocationInterface } from "@/interfaces/locations";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/locations.json', 'utf8');

  const locations = JSON.parse(fileContents) as LocationInterface[];
  let filteredLocations: LocationInterface[] | null = null;

  if (name) {
    filteredLocations = locations.filter(location => 
      location.name === name  
    );
  }

  return NextResponse.json<LocationInterface[]>(filteredLocations ?? locations, {status:200});
}