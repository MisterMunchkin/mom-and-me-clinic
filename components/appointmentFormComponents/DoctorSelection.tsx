'use client'

import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { Avatar, Button, Card, CardBody, CardHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";
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
          <TimelineConnector className="" />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-pastel-pink" />
            <Typography variant="h6" className="leading-none text-gray-650">
              Service
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
                variant="small"
                color="gray"
                className="font-normal text-gray-650"
              >
              {selectedService.name}
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector className="" />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-pastel-pink" />
            <Typography variant="h6" className="leading-none text-gray-650">
              Choose a doctor
            </Typography>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>

      <div className="overflow-auto max-h-[75vh] md:max-h-[70vh] p-1 flex flex-col space-y-4">
        {data.map((doctor) => (
          <Card 
            key={doctor.name}
            
            shadow={false} 
            onClick={() => setSelectedDoctor(doctor)}
            className={`${selectedDoctor?.name === doctor.name ? 'bg-melon' : 'bg-white-ivory'}
            border-gray-300 border`}>
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="ml-4 mr-8 flex items-center gap-4 my-4"
            >
              <Avatar
                size="lg"
                variant="circular"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt={doctor.name}
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="text-gray-650">
                    {doctor.fullTitle}
                  </Typography>
                </div>

                <Typography variant="small" className="text-gray-650">{doctor.joinedServiceTags}</Typography>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <ClinicSchedules 
                clinicSchedules={doctor.clinicSchedules}
              />
            </CardBody>
          </Card>
        ))}
      </div>
      
      <div className="w-full grid grid-cols-4 gap-y-2 pt-4">
        <Button
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2 rounded-full bg-pastel-pink shadow-none hover:shadow-lg hover:shadow-pastel-pink/50"
          type="button"
          onClick={() => handleNext()}
        >
          Go to next step <span aria-hidden="true">→</span>
        </Button>
        <Button
          variant="text"
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2 text-gray-650 hover:bg-white-ivory"
          type="button"
          onClick={() => handleBack()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}