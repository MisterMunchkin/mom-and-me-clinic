'use client'

import { DoctorInterface } from "@/shared/interfaces/doctor";
import DoctorCard from "./DoctorCard";

interface DesktopDoctorsProps {
  data: DoctorInterface[];
  className?: string;
}

export default function DesktopDoctors({data, className}: DesktopDoctorsProps) {
  return (
    <div
      className={className || ''}
    >
      <div className="flex flex-row overflow-x-auto space-x-6">
        {data.map((doctor, index) => (
          <DoctorCard
            key={index}
            data={doctor}
          />
        ))}
      </div>
    </div>
  );
}