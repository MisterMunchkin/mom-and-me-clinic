import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { IconButton } from "@/utilities/material-tailwind-export";

interface NavBarProps {
  setShowDrawer: (show: boolean) => void;
}

export default function NavBar({setShowDrawer}: NavBarProps) {
  return (
    <nav className={`frosted-glass top-0 sticky md:px-8 px-4 z-50`}>
      <div className="flex items-center">
        <div className="h-16 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <div className="block order-2 md:order-1">
            <Image
              src={logo}
              alt='logo'
              width={200}
            />
          </div>
          <div className="text-gray-650 w-full hidden md:block md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="px-2 md:hidden hover:text-pastel-pink cursor-pointer"><a href="#doctors">Doctors</a></li>
              <li className="hidden md:px-4 md:py-2 md:block hover:text-pastel-pink cursor-pointer"><a href="#doctors">Know your Doctors</a></li>
              <li className="px-2 md:px-4 md:py-2 hover:text-pastel-pink cursor-pointer"><a href="#services">Services</a></li>
              <li className="px-2 md:px-4 md:py-2 hover:text-pastel-pink cursor-pointer"><a href="#location">Clinic Locations</a></li>
            </ul>
          </div>
          <div className="block order-1 md:hidden">
          <IconButton
            variant="text"
            className="text-gray-650"
          >
            <Bars3Icon 
              className="h-8 w-8"
              onClick={() => setShowDrawer(true)}
            />
          </IconButton>
          </div>
          <div className="hidden md:block md:order-3">
            <Link 
              href={{
                pathname: `/appointment`
              }}  
              className="py-3 px-6 rounded-full bg-pastel-pink text-white shadow-none hover:shadow-lg hover:shadow-pastel-pink/50 min-w-[18rem]">
              <span className="button-text inline-flex items-center">
                Set an Appointment
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}