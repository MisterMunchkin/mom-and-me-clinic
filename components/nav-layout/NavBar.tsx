import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { IconButton } from "@/shared/utilities/material-tailwind-export";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

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
            <a
              href="#hero"
            >
              <Image
                src={logo}
                alt='logo'
                width={200}
                sizes="(max-width: 720px) 20vw, 10vw"
                priority
              />
            </a>
          </div>
          <div className="text-gray-650 w-full hidden md:block md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              <li className="px-2 md:hidden">
                <a 
                  className="hover:text-pastel-pink cursor-pointer"
                  href="#doctors">Doctors</a>
              </li>
              <li className="hidden md:px-4 md:py-2 md:block">
                <a 
                  className="hover:text-pastel-pink cursor-pointer"
                  href="#doctors">Know your Doctors</a>
              </li>
              <li className="px-2 md:px-4 md:py-2">
                <a 
                  className="hover:text-pastel-pink cursor-pointer"
                  href="#services">Services</a>
              </li>
              <li className="px-2 md:px-4 md:py-2">
                <a 
                  className="hover:text-pastel-pink cursor-pointer"
                  href="#location">Clinic Locations</a>
              </li>
            </ul>
          </div>
          <div className="block order-1 md:hidden">
          <IconButton
            variant="text"
            className="text-gray-650 focus:bg-pastel-pink focus:text-pastel-green active:bg-pastel-pink active:text-pastel-green hover:bg-white-coffee hover:text-gray-650"
            aria-label="Burger Menu"
          >
            <Bars3Icon 
              className="h-8 w-8"
              onClick={() => setShowDrawer(true)}
            />
          </IconButton>
          </div>
          {/* <div className="hidden md:block md:order-3">
            <Link 
              href={{
                pathname: `/appointment`
              }} 
              className="py-2 px-4 rounded-full bg-pastel-pink text-white-ivory hover:shadow-lg hover:shadow-pastel-pink/50">
              <span
                className="button-text items-center"
              >
                <CalendarDaysIcon className="w-5 h-5 inline mr-3 mb-[4px]" />
                <span className="font-semibold tracking-wider text-sm">Book Appointment</span>
              </span>
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  )
}