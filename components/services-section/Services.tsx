
import { ServiceClass } from "@/shared/classes/service";
import Service from "./Service";
import { getServicesURL } from "@/shared/services/api-service.constants";
import fetch from 'node-fetch';

export default async function Services() {
  const services = await getServices();

  if (!services) return <div>No services fetched.</div>

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-stretch justify-stretch mx-4 md:mx-0">
      {services.map((service) => (
        <Service key={service.name} service={service} showDescriptionPopover={true} />
      ))}
    </div>
  )
}

const getServices = async(): Promise<ServiceClass[]> => {
  try {
    const res = await fetch(`${process.env.URL}${getServicesURL}`);
    
    if (!res.ok) {
      throw new Error ("failed to fetch services");
    }
    // await new Promise((resolve) => setTimeout(resolve, 10000)) //test skeleton
    const data = await res.json() as ServiceClass[];
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}