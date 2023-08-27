
import Service from "./Service";
import { ServiceClass } from "@/classes/service";

export default async function Services() {
  const services = await getServices();

  if (!services) return <div>No services fetched.</div>

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {services.map((service) => (
        <Service key={service.name} service={service} />
      ))}
    </div>
  )
}

const getServices = async(): Promise<ServiceClass[]> => {
  const res = await fetch(`${process.env.URL}/api/services`);
  
  if (!res.ok) {
    throw new Error ("failed to fetch services");
  }
  
  const data = await res.json() as ServiceClass[];
  return data;
}