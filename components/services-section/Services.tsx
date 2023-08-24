'use client'

import useSWR from 'swr';
import Service from "./Service";
import { ServiceClass } from "@/classes/service";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Services() {
  const { data, error, isLoading } = useSWR<ServiceClass[], any>('/api/services', fetcher);

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  if (!data) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map((service) => (
        <Service key={service.name} service={service} />
      ))}
    </div>
  )
}