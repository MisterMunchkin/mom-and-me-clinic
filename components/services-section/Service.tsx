import { ServiceClass } from "@/classes/service";
import { Card, CardFooter } from "@/utilities/material-tailwind-export";

interface ServiceProps {
  service: ServiceClass;
}

export default function Service({service}: ServiceProps) {
  return (
    <Card 
      shadow={false}
      className="mx-4 md:mx-1 w-min-[24rem] bg-white-coffee hover:cursor-pointer">
      <CardFooter>
        <h3 className="text-lg font-bold text-gray-650 sm:text-xl">{service.name}</h3>
        <p className="hidden text-sm sm:block text-gray-650 whitespace-pre-line">
          {service.description}
        </p>
      </CardFooter>
    </Card>
  );
}