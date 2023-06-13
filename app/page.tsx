import Image from 'next/image'
import NavBar from './components/NavBar'
import Hero from './components/Hero';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 md:p-24">
        <Hero />
      </main>
    </>
  )
}
