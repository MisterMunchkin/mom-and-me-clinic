'use client'

import { DoctorInterface } from "@/shared/interfaces/doctor";
import DoctorCard from "./DoctorCard";
import { useEffect, useState } from "react";
import { getDoctorsURL } from "@/shared/services/api-service.constants";
import LoadingDoctor from '@/components/loading/loading-doctor';


interface DesktopDoctorsProps {
  className?: string;
}

export default function DesktopDoctors({className}: DesktopDoctorsProps) {
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
      <div className="flex flex-row overflow-x-auto space-x-6">
        {isLoading && Array.from({length: 2}, (_, i) => i + 1).map((id) => (
          <LoadingDoctor
            key={id}
          />
        ))}
        {!isLoading && doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            data={doctor}
          />
        ))}
      </div>
    </div>
  );
}