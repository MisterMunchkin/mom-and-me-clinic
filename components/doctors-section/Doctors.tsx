import DesktopDoctors from './DesktopDoctors';
import MobileDoctors from './MobileDoctors';
import { DoctorInterface } from "@/shared/interfaces/doctor";

export default async function Doctors() {
  const doctors = await getDoctors();

  return (
    <div>
      <DesktopDoctors 
        data={doctors}
        className='hidden md:block'
      />
      <MobileDoctors
        data={doctors}
        className='block md:hidden'
      />
    </div>
  );
}

const getDoctors = async(): Promise<DoctorInterface[]> => {
  const res = await fetch(`${process.env.URL}/api/doctors`);
  
  if (!res.ok) {
    throw new Error ("failed to fetch doctors");
  }
  // await new Promise((resolve) => setTimeout(resolve, 10000)) //test skeleton
  let data = await res.json() as DoctorInterface[];
  return data;
}