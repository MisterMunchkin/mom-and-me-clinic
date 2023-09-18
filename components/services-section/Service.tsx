import { ServiceClass } from "@/shared/classes/service";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface ServiceProps {
  service: ServiceClass;
}

export default function Service({service}: ServiceProps) {
  return (
    <div className="p-4 w-min-[24rem] bg-white-coffee hover:cursor-pointer rounded-lg text-center">
      <div className="flex flex-1 items-center justify-between">
        <span className="text-lg font-bold text-gray-650 sm:text-xl flex-shrink">
          {service.name}
        </span>
        {service.description && (
          <Popover>
            <PopoverTrigger className="text-lg font-bold text-gray-650 sm:text-xl flex-shrink-0" asChild>
              <InformationCircleIcon 
                className="h-6 w-6 text-gray-650"
              />
            </PopoverTrigger>

              <PopoverContent
                side="bottom"
                className="bg-melon border-melon p-4 text-center"
              >
                <div className="text-base text-gray-650 whitespace-pre-line">
                  {service.description}
                </div>
              </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}