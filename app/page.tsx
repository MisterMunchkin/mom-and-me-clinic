import Image from 'next/image'
import NavBar from './components/NavBar'
import Hero from './components/Hero';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 md:px-24 md:pt-8">
        <Hero />
      </div>
      <main id="main-content" className="flex flex-col items-center justify-between">
        {/* Main info should be list of doctors where you can book */}
        <div style={{minHeight: 2000}}>
          Test
        </div>
      </main>
    </>
  )
}
