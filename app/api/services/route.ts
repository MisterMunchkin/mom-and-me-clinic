import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { ServiceInterface } from "@/interfaces/service";

export async function GET(request: NextRequest) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/services.json', 'utf8');

  const services = JSON.parse(fileContents) as ServiceInterface[];

  return NextResponse.json<ServiceInterface[]>(services, {status:200});
}