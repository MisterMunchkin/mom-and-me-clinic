import { ServiceInterface } from "@/interfaces/service";
import { TagToHexColorInterface } from "@/interfaces/tag-to-hex-color";
import Link from "next/link";

interface ServiceProps {
  service: ServiceInterface;
}

const tagToHexColorDict: TagToHexColorInterface = {
  "obstetrics": {
    bgColor: "bg-orange-100",
    textColor: "text-orange-600"
  },
  "gynecology": {
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-600"
  }
}

export default function Service({service}: ServiceProps) {
  return (
    <Link
      className="relative flex flex-col items-start justify-between rounded-xl border border-gray-200 pt-4 pr-4 pl-4 shadow-lg md:pt-6 md:pr-6 md:pl-6"
      href={{
        pathname: `/appointment`,
        query: {
          backNav: `#services`
        }
      }}
    >
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {service.name}
      </h3>

      <p className="mt-2 mb-2 hidden text-sm sm:block text-gray-500 whitespace-pre-line">
        {service.description}
      </p>

      <div className="px-3 py-1.5 space-x-2">
        {service.tags.map(tag => (
          <span 
            key={tag}
            className={`${tagToHexColorDict[tag as keyof TagToHexColorInterface].bgColor} 
            ${tagToHexColorDict[tag as keyof TagToHexColorInterface].textColor}
            rounded-full px-1.5 py-1 text-xs font-medium`}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}