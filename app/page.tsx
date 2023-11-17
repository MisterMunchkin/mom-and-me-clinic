import Hero from '@/components/hero-section/Hero';
import HeroCarousel from '@/components/hero-section/HeroCarousel';
import Locations from '@/components/location-section/Locations';
import NavLayout from '@/components/nav-layout/NavLayout';
import LoadingServices from '@/components/loading/loading-services';
import OBGYNBanner from '@/components/services-section/ServiceBanner';
import LoadingDoctors from '@/components/loading/loading-doctors';

import lazyLoad from 'next/dynamic';
import Footer from '@/components/Footer';

const Doctors = lazyLoad(() => 
  import ('@/components/doctors-section/Doctors'),
  {
    loading: () => <LoadingDoctors />
  }
)

const Services = lazyLoad(() => 
  import('@/components/services-section/Services'),
  {
    loading: () => <LoadingServices />
  }
)

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 * Forces any fetch request to disable cache and always revalidate. Needed
 * because the Doctors, Services and Locations are SSR'ed, and by default it tries to 
 * fetch on build time. This prevents that.
 */
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <NavLayout />
      <section id="hero" className="pt-6 md:px-24 md:py-16 flex flex-col items-center space-y-6">
        <Hero />
        <HeroCarousel />
      </section>
      <main id="main-content" className="flex flex-col items-baseline justify-center">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className='pt-8 md:pt-12'>
          <div className="mx-auto pb-4 pl-6 md:pb-6 md:px-24">
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Doctors</h1>
            </div>
          </div>
          <div className='md:px-24'>
            <Doctors />
          </div>
        </section>

        <section id="services" className="pt-8 md:pt-12">
          <div className="mx-auto pb-4 pl-6 md:pb-6 md:px-24">
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-gray-650 sm:text-4xl md:mb-4">Our Services</h1>
              <OBGYNBanner className='hidden md:block w-full' />
            </div>
          </div>
          <OBGYNBanner className='block md:hidden w-screen pb-4' />
          <div className='md:px-24'>
            <Services />
          </div>
        </section>

        <section id="location" className="mt-8 md:mt-16 pt-8 md:pt-12 pb-10 md:pb-24 bg-melon w-full">            
          <Locations />
        </section>
      </main>
      <Footer />
    </>
  )
}
