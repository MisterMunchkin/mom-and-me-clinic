import Hero from '@/components/hero-section/Hero';
import HeroCarousel from '@/components/hero-section/HeroCarousel';
import Doctors from '@/components/doctors-section/Doctors';
import Services from '@/components/lists/Services';
import Maps from '@/components/Maps';
import NavLayout from '@/components/nav-layout/NavLayout';

export default function Home() {
  return (
    <>
      <NavLayout />
      <section id="hero" className="min-h-screen py-6 md:px-24 md:py-24 flex flex-col items-center space-y-6">
        <Hero />
        <HeroCarousel />
      </section>
      <main id="main-content" className="flex flex-col items-baseline justify-center px-12 md:px-24">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className="pt-24 md:pt-16">
          <div className="mx-auto pb-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Our Doctors</h1>
            </div>
          </div>
          <Doctors />
        </section>

        <section id="services" className="pt-24 md:pt-16">
          <div className="mx-auto pb-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-650 sm:text-4xl">Services</h1>
            </div>
          </div>
          <Services />
        </section>

        <section id="location" className="pt-24 md:pt-16 pb-24">
          <div className="mx-auto pb-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Locations</h1>
            </div>
          </div>
          <Maps />
        </section>
      </main>
    </>
  )
}
