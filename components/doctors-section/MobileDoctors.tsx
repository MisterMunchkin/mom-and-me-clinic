'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { DoctorInterface } from "@/shared/interfaces/doctor";
import DoctorCard from "./DoctorCard";
import { useEffect, useState } from "react";
import { getDoctorsURL } from "@/shared/services/api-service.constants";
import LoadingDoctor from '@/components/loading/loading-doctor';

interface MobileDoctorsProps {
  className?: string;
}

export default function MobileDoctors({className}: MobileDoctorsProps) {
  const [ doctors, setDoctors ] = useState<DoctorInterface[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getDoctorsURL());
      if (!res.ok) {
        throw new Error ("failed to fetch doctors");
      }

      const datas = await res.json() as DoctorInterface[];
      setDoctors(datas);
      setIsLoading(false);
    }

    fetchData();
  }, [])

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
          {isLoading && Array.from({length: 1}, (_, i) => i + 1).map((id) => (
            <LoadingDoctor
              key={id}
              className='mx-4 min-h-[5rem] min-w-[22rem]'
            />
          ))}
          {!isLoading && doctors.map((doctor, index) => (
            <SwiperSlide
              key={index}
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