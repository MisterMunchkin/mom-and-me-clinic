import DesktopDoctors from './DesktopDoctors';
import MobileDoctors from './MobileDoctors';

export default function Doctors() {
  return (
    <div>
      <DesktopDoctors 
        className='hidden md:block'
      />
      <MobileDoctors
        className='block md:hidden'
      />
    </div>
  );
}
