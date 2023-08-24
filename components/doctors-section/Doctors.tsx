'use client'

import useSWR from 'swr';
import { DoctorClass } from "@/classes/doctor";
import DesktopDoctors from './DesktopDoctors';
import MobileDoctors from './MobileDoctors';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Doctors() {
  const {data, error, isLoading} = useSWR<DoctorClass[], any>('/api/doctors', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  if (!data) return null

  return (
    <div>
      <DesktopDoctors 
        doctors={data}
        className='hidden md:block'
      />
      <MobileDoctors
        doctors={data}
        className='block md:hidden'
      />
    </div>
  );
}