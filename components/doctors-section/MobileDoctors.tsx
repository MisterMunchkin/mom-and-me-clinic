'use client'

import { DoctorClass } from "@/classes/doctor";
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { Card, CardHeader, Typography } from "@material-tailwind/react";

interface MobileDoctorsProps {
  doctors: DoctorClass[];
  className?: string;
}

export default function MobileDoctors({doctors, className}: MobileDoctorsProps) {
  return (
    <div
      className={className || ''}
    >
      <div className="w-screen">
        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={10}
        >
          {doctors.map((doctor: DoctorClass) => (
          <SwiperSlide
            key={doctor.name}
          >
            <Card
                shadow={false}
                className="bg-white-coffee border-white-coffee hover:cursor-pointer min-w-[22rem] mx-1 mb-6"
              >
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="m-2 flex items-center gap-2"
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

                    <Typography
                      variant="h6"
                      className="text-gray-650 break-words"
                    >
                      {doctor.fullTitle}
                    </Typography>

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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}