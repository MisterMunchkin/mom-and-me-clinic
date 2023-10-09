import { ServiceClass } from "@/shared/classes/service";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toastNotifyService } from "@/shared/services/toast-notify-service";
import { toastConstants } from "@/shared/utilities/toast-constants";
import { getServicesURL } from "@/shared/services/api-service.constants";
import Service from "../services-section/Service";
import LoadingService from '../loading/loading-service';

interface ServiceSelectionProps {
  defaultSelected?: ServiceClass;
  handleFormSubmit: (selectedService: ServiceClass) => void;
}

export default function ServiceSelection({defaultSelected, handleFormSubmit}: ServiceSelectionProps) {
  const [ services, setServices ] = useState<ServiceClass[]>([]);
  const [ selectedService, setSelectedService ] = useState<ServiceClass | undefined>(defaultSelected);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const {
    toastId, 
    message
  } = toastConstants.serviceSelection.noSelectedService;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getServicesURL);
      if (!res.ok) {
        throw new Error ("failed to fetch services");
      }
      const data = await res.json() as ServiceClass[];
      setServices(data);
      setIsLoading(false);
      console.log(data);
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (!selectedService) {
      //display message or error: needs to select a service
      toastNotifyService.notifyWarning(toastId, message);
      return;
    }
    toastNotifyService.dismiss(toastId);
    handleFormSubmit(selectedService);
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="overflow-auto max-h-[75vh] p-1 grid gap-4 grid-cols-1 md:max-h-[70vh] sm:grid-cols-2">
          {isLoading && Array.from({length: 10}, (_, i) => i + 1).map((id) => (
            <LoadingService key={id} />
          ))}
          {!isLoading && services.map((service, index) => (
            <Service
              className={`${selectedService?.name === service.name ? 'ring-pastel-pink ring-4': undefined} hover:cursor-pointer`}
              key={index}
              service={service} 
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
        <div className="w-full grid grid-cols-4 pt-4">
          <Button
            className="col-span-4 md:col-start-2 md:col-span-2 rounded-full bg-pastel-pink shadow-none hover:shadow-lg hover:shadow-pastel-pink/50"
            type="button"
            onClick={() => handleNext()}
          >
            <span className="button-text">Go to next step <span aria-hidden="true">→</span></span>
          </Button>
        </div>
      </div>
    </>
  )
}