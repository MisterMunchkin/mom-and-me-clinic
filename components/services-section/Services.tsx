'use client'

import { ServiceClass } from "@/shared/classes/service";
import Service from "./Service";
import { getServicesURL } from "@/shared/services/api-service.constants";
import { useEffect, useState } from "react";
import LoadingService from "@/components/loading/loading-service"; 

export default function Services() {
  const [ services, setServices ] = useState<ServiceClass[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getServicesURL);
      if (!res.ok) {
        throw new Error ("failed to fetch services");
      }
      const data = await res.json() as ServiceClass[];
      setServices(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-stretch justify-stretch mx-4 md:mx-0">
      {isLoading && Array.from({length: 10}, (_, i) => i + 1).map((id) => (
        <LoadingService key={id} />
      ))}
      {!isLoading && services.map((service) => (
        <Service key={service.name} service={service} showDescriptionPopover={true} />
      ))}
    </div>
  )
}