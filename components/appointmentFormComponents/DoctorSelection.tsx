'use client'

import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { Button, Card, CardBody, CardHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";
import { useState } from "react";
import useSWR from 'swr';
import Image from "next/image";
import ClinicSchedules from "../lists/ClinicSchedules";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

interface DoctorSelectionProps {
  defaultSelected?: DoctorClass;
  selectedService: ServiceClass;
  handleFormSubmit: (selectedDoctor: DoctorClass) => void;
  handleBack: () => void;
}

export default function DoctorSelection({defaultSelected, selectedService , handleFormSubmit, handleBack}: DoctorSelectionProps) {
  const { data, error, isLoading } = useSWR<DoctorClass[], any>(() => '/api/doctors?serviceTags=' + selectedService.joinedTags, fetcher);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorClass | undefined>(defaultSelected);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null
  
  const handleNext = () => {
    if (!selectedDoctor) {
      //display message or error: needs to select a doctor
      return;
    }

    handleFormSubmit(selectedDoctor);
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* timeline */}
      <Timeline className="w-full">
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Service
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
              {selectedService.name}
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Choose a doctor
            </Typography>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>

      <div className="overflow-auto max-h-[60vh] p-1 flex flex-col space-y-4">
        {data.map((doctor) => (
          <Card
            key={doctor.name} 
            className={`${selectedDoctor?.name === doctor.name ? 'ring-primary ring-4' : ''}
            flex-row col-span-1 max-h-[10rem] hover:cursor-pointer`}
            onClick={() => setSelectedDoctor(doctor)}>
            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
              <Image
                alt="Art"
                src="https://picsum.photos/200"
                className="h-full w-full object-cover"
                width={200}
                height={200}
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {doctor.name}
              </Typography>
              <ClinicSchedules 
                clinicSchedules={doctor.clinicSchedules}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      
      <div className="w-full grid grid-cols-4 gap-y-4">
        <Button
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2"
          type="button"
          onClick={() => handleNext()}
        >
          Next
        </Button>
        <Button
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2"
          type="button"
          onClick={() => handleBack()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}