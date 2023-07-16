'use client'

import { ServiceClass } from "@/classes/service";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import useSWR from "swr";
import ServiceTags from "../lists/ServiceTags";
import { useState } from "react";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

interface ServiceSelectionInterface {
  handleFormSubmit: (selectedService: ServiceClass) => void;
}

export default function ServiceSelection({handleFormSubmit}: ServiceSelectionInterface) {
  const { data, error, isLoading } = useSWR<ServiceClass[], any>('/api/services', fetcher);
  const [ selectedService, setSelectedService ] = useState<ServiceClass>();

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  const handleNext = () => {
    if (!selectedService) {
      //display message or error: needs to select a service
      return;
    }

    handleFormSubmit(selectedService);
  }
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-auto h-[60vh] p-1 grid gap-4 grid-cols-1 md:grid-cols-2 items-start">
        {data.map((service) => (
          <Card 
            className={`${selectedService?.name === service.name ? 'ring-primary ring-4' : ''}
            w-64 hover:cursor-pointer`}
            key={service.name}
            onClick={() => setSelectedService(service)}
          >
            <CardBody>
              <Typography variant="h6" className="mb-2">
                {service.name}
              </Typography>
              <Typography variant="small">
                {service.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <ServiceTags tags={service.tags} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        disabled={!selectedService}
        onClick={() => handleNext()}
      >
        Next
      </Button>
    </div>
  )
}