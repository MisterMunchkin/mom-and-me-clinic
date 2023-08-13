'use client'

import { ServiceClass } from "@/classes/service";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import useSWR from "swr";
import ServiceTags from "@/components/lists/ServiceTags";
import { useState } from "react";
import { fetcher } from "@/services/swr-service";
import { toastNotifyService } from "@/services/toast-notify-service";

interface ServiceSelectionProps {
  defaultSelected?: ServiceClass;
  handleFormSubmit: (selectedService: ServiceClass) => void;
}

export default function ServiceSelection({defaultSelected, handleFormSubmit}: ServiceSelectionProps) {
  const { data, error, isLoading } = useSWR<ServiceClass[], any>('/api/services', fetcher);
  const [ selectedService, setSelectedService ] = useState<ServiceClass | undefined>(defaultSelected);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  const handleNext = () => {
    if (!selectedService) {
      //display message or error: needs to select a service
      toastNotifyService.notifyWarning('service-invalid', 'Please select a service to request an appointment');
      return;
    }

    handleFormSubmit(selectedService);
  }
  
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="overflow-auto max-h-[75vh] p-1 grid gap-4 grid-cols-1 md:max-h-[70vh] sm:grid-cols-2 items-start">
          {data.map((service) => (
            <Card 
              className={`${selectedService?.name === service.name ? 'ring-melon ring-4' : ''}
              w-full hover:cursor-pointer`}
              key={service.name}
              onClick={() => setSelectedService(service)}
            >
              <CardBody>
                <Typography variant="h6" className="mb-2 text-gray-650">
                  {service.name}
                </Typography>
                {service.description && (
                  <Typography variant="small" className="text-gray-650">
                    {service.description}
                  </Typography>
                )}
              </CardBody>
              <CardFooter className="pt-0">
                <ServiceTags tags={service.tags} />
              </CardFooter>
            </Card>
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