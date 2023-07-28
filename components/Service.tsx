import { ServiceClass } from "@/classes/service";
import Link from "next/link";
import ServiceTags from "./lists/ServiceTags";
interface ServiceProps {
  service: ServiceClass;
}

export default function Service({service}: ServiceProps) {
  return (
    <Link
      className="relative flex flex-col items-start justify-between rounded-xl border border-gray-200 pt-4 pr-4 pl-4 shadow-lg md:pt-6 md:pr-6 md:pl-6"
      href={{
        pathname: `/appointment`,
        query: {
          backNav: '#services',
          defaultService: service.name
        }
      }}
    >
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {service.name}
      </h3>

      <p className="mt-2 mb-2 hidden text-sm sm:block text-gray-500 whitespace-pre-line">
        {service.description}
      </p>

      <div className="py-1.5 space-x-2">
        <ServiceTags tags={service.tags} />
      </div>
    </Link>
  );
}