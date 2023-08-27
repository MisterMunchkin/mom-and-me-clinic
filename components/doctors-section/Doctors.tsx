import { DoctorClass } from "@/classes/doctor";
import DesktopDoctors from './DesktopDoctors';
import MobileDoctors from './MobileDoctors';

export default async function Doctors() {
  const doctors = await getDoctors();

  return (
    <div>
      <DesktopDoctors 
        doctors={doctors}
        className='hidden md:block'
      />
      <MobileDoctors
        doctors={doctors}
        className='block md:hidden'
      />
    </div>
  );
}

const getDoctors = async(): Promise<DoctorClass[]> => {
  const res = await fetch(`${process.env.URL}/api/doctors`);
  
  if (!res.ok) {
    throw new Error ("failed to fetch services");
  }
  // await new Promise((resolve) => setTimeout(resolve, 10000)) //test skeleton
  const data = await res.json() as DoctorClass[];
  return data;
}