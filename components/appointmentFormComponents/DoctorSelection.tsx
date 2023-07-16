'use client'

import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { Timeline, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";
import { useState } from "react";
import useSWR from 'swr';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

interface DoctorSelectionProps {
  selectedService: ServiceClass;
  handleFormSubmit: (selectedDoctor: DoctorClass) => void;
}

export default function DoctorSelection({selectedService , handleFormSubmit}: DoctorSelectionProps) {
  const { data, error, isLoading } = useSWR<DoctorClass[], any>('/api/doctors', fetcher);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorClass>();

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  return (
    <div className="flex flex-col space-y-4">
      {/* timeline */}
      <Timeline>
        <TimelineItem>
        <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              {selectedService.name}
            </Typography>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  );
}