import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={`frosted-glass top-0 transition-top duration-500 ease-in-out bg-gray-200 shadow shadow-gray-300 w-screen sticky md:px-8 px-4 z-50`}>
      <div className="flex items-center">
        <div className="h-16 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <div className="text-primary hidden md:block md:order-1">
            {/* Heroicon - Chip Outline */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="text-gray-500 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
                      {/* Active Link = text-indigo-500
                      Inactive Link = hover:text-indigo-500 */}
              <li className="px-2 md:hidden hover:text-primary"><a href="#doctors">Doctors</a></li>
              <li className="hidden md:px-4 md:py-2 md:block"><a href="#doctors">Know your Doctors</a></li>
              <li className="px-2 md:px-4 md:py-2 hover:text-primary"><a href="#services">Services</a></li>
              <li className="px-2 md:px-4 md:py-2 hover:text-primary"><a href="#location">Clinic Locations</a></li>
              {/* Move this to the float right */}
              {/* <li className="md:px-4 md:py-2 hover:bg-indigo-500 rounded-md bg-primary text-white"><a href="#">Set an Appointment</a></li> */}
            </ul>
          </div>
          <div className="hidden md:block md:order-3 order-2">
            <Link 
              href={{
                pathname: `/appointment`
              }}  
              className="md:px-4 md:py-2 p-2 hover:bg-primary-hover rounded-md text-sm font-semibold bg-primary text-white">
              Set an Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}