import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';
import { ServiceInterface } from "@/shared/interfaces/service";
import { ServiceClass } from "@/shared/classes/service";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const serviceTags = searchParams.get("serviceTags");

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //read the json data file
  const fileContents = await fs.readFile(jsonDirectory + '/services.json', 'utf8');

  const services = JSON.parse(fileContents) as ServiceInterface[];
  let serviceClasses = services.map(service => ServiceClass.fromInterface(service));

  if (serviceTags) {
    serviceClasses = filterServices(serviceClasses, ServiceClass.getSplittedTags(serviceTags));
  }

  return NextResponse.json<ServiceClass[]>(serviceClasses, {status:200});
}

function filterServices(services: ServiceClass[], serviceTags: string[]) {
  return services.filter(service => 
    serviceTags.some(tag => service.tags.includes(tag))
  );
}