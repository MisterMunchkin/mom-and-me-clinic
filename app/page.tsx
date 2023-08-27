import Hero from '@/components/hero-section/Hero';
import HeroCarousel from '@/components/hero-section/HeroCarousel';
import Doctors from '@/components/doctors-section/Doctors';
import Services from '@/components/services-section/Services';
import Maps from '@/components/Maps';
import NavLayout from '@/components/nav-layout/NavLayout';
import { Suspense } from 'react';
import LoadingServices from './loading-services';
import OvariesIcon from '@/public/lifesavers_ovaries.png'
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <NavLayout />
      <section id="hero" className="pt-6 pb-10 md:px-24 md:py-24 flex flex-col items-center space-y-6">
        <Hero />
        <HeroCarousel />
      </section>
      <main id="main-content" className="flex flex-col items-baseline justify-center md:px-24">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className='pt-24 md:pt-16'>
          <div className="mx-auto pb-6 pl-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Doctors</h1>
            </div>
          </div>
          <Doctors />
        </section>

        <section id="services" className="pt-24 md:pt-16">
          <div className="mx-auto pb-4 pl-6 md:pb-6">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Services</h1>
            </div>
          </div>

          <div className="w-screen md:w-full md:rounded-lg h-[6rem] bg-pastel-green flex place-items-center justify-center mb-6">
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

          <Suspense fallback={<LoadingServices />}>
            <Services />
          </Suspense>
        </section>

        <section id="location" className="pt-24 md:pt-16 pb-24">
          <div className="mx-auto pb-6 pl-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Location</h1>
            </div>
          </div>
          <Maps />
        </section>
      </main>
    </>
  )
}
