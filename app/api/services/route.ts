import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/services.json', 'utf8');

  return NextResponse.json(fileContents, {status:200});
}