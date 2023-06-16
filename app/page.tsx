import NavBar from '../components/NavBar'
import Hero from '../components/Hero';
import Doctors from '../components/Doctors';
import Services from '../components/Services';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 md:px-24 md:pt-8">
        <Hero />
      </div>
      <main id="main-content" className="flex flex-col items-center justify-between px-12 md:px-24">
        {/* Main info should be list of doctors where you can book */}
        <section id="doctors" className="pt-24 md:pt-4">
          <Doctors />
        </section>

        <section id="services" className="pt-24 md:pt-4">
          <Services />
        </section>
      </main>
    </>
  )
}
