import NavBar from '../components/NavBar'
import Hero from '../components/Hero';
import Doctors from '../components/Doctors';
import Services from '../components/Services';
import Maps from '@/components/Maps';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 md:px-24 md:pt-8">
        <Hero />
      </div>
      <main id="main-content" className="flex flex-col items-baseline justify-center px-12 md:px-24">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className="pt-24 md:pt-16">
          <div className="mx-auto pb-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Know your Doctors</h1>
            </div>
          </div>
          <Doctors />
        </section>

        <section id="services" className="pt-24 md:pt-16">
          <div className="mx-auto pb-6 md:pb-12">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Services</h1>
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
