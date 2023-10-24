'use client'

import { DoctorClass } from "@/shared/classes/doctor";
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { DoctorInterface } from "@/shared/interfaces/doctor";
import DoctorCard from "./DoctorCard";

interface MobileDoctorsProps {
  data: DoctorInterface[];
  className?: string;
}

export default function MobileDoctors({data, className}: MobileDoctorsProps) {
  return (
    <div
      className={className || ''}
    >
      <div className="w-screen">
        <Swiper
          className="pagination-slider"
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={10}
        >
          {data.map((doctor) => (
            <SwiperSlide
              key={doctor.name}
            >
              <DoctorCard 
                data={doctor}
                className="mx-4 min-h-[5rem] min-w-[22rem]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}