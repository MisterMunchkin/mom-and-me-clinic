import { ServiceClass } from "@/shared/classes/service";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { shadcn } from "@/shared/utilities/shadcn";

interface ServiceProps extends React.ComponentProps<"div"> {
  service: ServiceClass;
  showDescriptionPopover?: boolean;
}

export default function Service({service, showDescriptionPopover, onClick, className}: ServiceProps) {
  return (
    <div
      onClick={onClick} 
      className={shadcn("py-4 pr-2 pl-4 w-min-[24rem] bg-white-coffee rounded-lg text-center flex items-center justify-center", className)}
    >
      <span className="text-lg font-bold text-gray-650 sm:text-xl flex-shrink">
        {service.name}
      </span>
      {showDescriptionPopover && service.description && (
        <Popover>
          <PopoverTrigger className="text-lg font-bold text-gray-650 sm:text-xl flex-shrink-0 hover:cursor-pointer ml-auto" asChild>
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
  );
}