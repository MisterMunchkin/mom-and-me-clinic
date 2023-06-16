import { ServiceInterface } from "@/interfaces/service";

interface ServiceProps {
  service: ServiceInterface;
}

export default function Service({service}: ServiceProps) {
  return (
    <a
      className="relative flex flex-col items-start justify-between rounded-xl border border-gray-200 pt-4 pr-4 pl-4 shadow-lg md:pt-6 md:pr-6 md:pl-6"
      href="#"
    >
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {service.name}
      </h3>

      <p className="mt-2 mb-2 hidden text-sm sm:block text-gray-500 whitespace-pre-line">
        {service.description}
      </p>

      <div className="px-3 py-1.5">
        {service.tags.map(tag => (
          <span 
            key={tag}
            className="rounded-full bg-green-100 px-1.5 py-1 text-xs font-medium text-green-600">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}