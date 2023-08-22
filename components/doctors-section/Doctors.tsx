'use client'

import useSWR from 'swr';
import { DoctorClass } from "@/classes/doctor";
import { Avatar, Card, CardHeader, Typography } from "@material-tailwind/react";
import Image from 'next/image';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Doctors() {
  const {data, error, isLoading} = useSWR<DoctorClass[], any>('/api/doctors', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  const imageWidth = 300;
  const imageHeight = 600;

  return (
    <>
      <div className="flex flex-col space-x-0 space-y-12 md:flex-row md:space-x-12 md:space-y-0">
        {data.map((doctor: DoctorClass) => (
          <Card
            key={doctor.name}
            shadow={false}
            className="bg-white-coffee border-white-coffee hover:cursor-pointer min-h-[8rem]"
          >
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="ml-4 mr-8 flex items-center gap-4 my-4"
            >
              <Image 
                className='rounded-full'
                src={doctor.picture} 
                alt={doctor.name}
                width={120}
                height={120}                
              />
              <div
                className="flex w-full flex-col gap-0.5"
              >
                <div
                  className="flex items-center justify-between"
                >
                  <Typography
                    variant="h6"
                    className="text-gray-650"
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
    </>
  );
}