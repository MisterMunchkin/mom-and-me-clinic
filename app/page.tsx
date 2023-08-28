import Hero from '@/components/hero-section/Hero';
import HeroCarousel from '@/components/hero-section/HeroCarousel';
import Doctors from '@/components/doctors-section/Doctors';
import Services from '@/components/services-section/Services';
import Locations from '@/components/location-section/Locations';
import NavLayout from '@/components/nav-layout/NavLayout';
import { Suspense } from 'react';
import LoadingServices from '@/components/loading/loading-services';
import OBGYNBanner from '@/components/services-section/ServiceBanner';
import LoadingDoctors from '@/components/loading/loading-doctors';
import Image from 'next/image';
import PlanIcon from '@/public/lifesavers_plant.png';

export default function Home() {
  return (
    <>
      <NavLayout />
      <section id="hero" className="pt-6 pb-10 md:px-24 md:py-24 flex flex-col items-center space-y-6">
        <Hero />
        <HeroCarousel />
      </section>
      <main id="main-content" className="flex flex-col items-baseline justify-center">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className='pt-24 md:pt-16'>
          <div className="mx-auto pb-6 pl-6 md:pb-12 md:px-24">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Doctors</h1>
            </div>
          </div>
          <div className='md:px-24'>
            <Suspense fallback={<LoadingDoctors />}>
              <Doctors />
            </Suspense>
          </div>
        </section>

        <section id="services" className="pt-24 md:pt-16">
          <div className="mx-auto pb-4 pl-6 md:pb-6 md:px-24">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl md:mb-4">Our Services</h1>
              <OBGYNBanner className='hidden md:block w-full' />
            </div>
          </div>
          <OBGYNBanner className='block md:hidden w-screen pb-4' />
          <div className='md:px-24'>
            <Suspense fallback={<LoadingServices />}>
              <Services />
            </Suspense>
          </div>
        </section>

        <section id="location" className="mt-8 md:mt-16 pt-8 md:pt-12 pb-10 md:pb-24 bg-melon w-full">
          <div className='flex flex-col md:flex-row justify-end'>
            <div className='flex justify-around pb-4 md:pb-0 md:flex-col md:place-content-start'>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Location</h1>
                <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
                  Room 611
                </div>
                <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
                  Velez Medical Arts Building
                </div>
                <div className='indent-3 text-md font-light tracking-light text-gray-650 sm:text-lg'>
                  V. Ranudo st., Cebu City
                </div>
              </div>
              <Image
                src={PlanIcon}
                alt='Plant'
                className='w-[75px] h-[100px] md:w-[100px] md:h-[150px] md:place-self-center'
              />
            </div>
            <Locations />
          </div>
        </section>
      </main>
    </>
  )
}
