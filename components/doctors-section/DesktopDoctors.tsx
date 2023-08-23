'use client'

import { DoctorClass } from "@/classes/doctor";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import Image from 'next/image';

interface DesktopDoctorsProps {
  doctors: DoctorClass[];
  className?: string;
}

export default function DesktopDoctors({doctors, className}: DesktopDoctorsProps) {
  return (
    <div
      className={className || ''}
    >
      <div className="flex flex-row overflow-x-auto whitespace-nowrap w-screen">
        {doctors.map((doctor: DoctorClass) => (
          <Card
            key={doctor.name}
            shadow={false}
            className="bg-white-coffee border-white-coffee hover:cursor-pointer min-h-[8rem] min-w-[20rem] mx-4 md:mx-6"
          >
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-2 md:mx-4 flex items-center gap-2 md:gap-4 md:my-4"
            >
              <Image 
                className='rounded-full'
                src={doctor.picture} 
                alt={doctor.name}
                width={100}
                height={100}                
              />
              <div
                className="flex w-full flex-col gap-0.5"
              >
                <div
                  className="flex items-center justify-between"
                >
                  <Typography
                    variant="h6"
                    className="text-gray-650 break-words"
                  >
                    {doctor.fullTitle}
                  </Typography>
                </div>

                <Typography variant="small" className="text-gray-650">
                  {doctor.joinedServiceTags}
                </Typography>
              </div>
            </CardHeader>
            {/* <CardBody className="pt-0">
              <ClinicSchedules>
              </ClinicSchedules>
            </CardBody> */}
          </Card>
        ))}
      </div>
    </div>
  );
}