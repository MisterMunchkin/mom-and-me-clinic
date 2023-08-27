import OvariesIcon from '@/public/lifesavers_ovaries.png'
import Image from 'next/image';

export default function OBGYNBanner() {
  return (
    <div className="w-screen md:rounded-lg h-[6rem] bg-pastel-green flex place-items-center justify-center mb-6">
      <Image 
        className='mr-6'
        src={OvariesIcon}
        alt='Ovaries'
        width={85}
      />
      <div className="px-2">
        <h3 className="text-xl tracking-light text-gray-650 sm:text-2xl">
          Obstetrics & Gynecology
        </h3>
        <h4 className="text-lg sm:text-xl text-gray-650 text-center">
          OBG-YN
        </h4>
      </div>
    </div>
  );
}