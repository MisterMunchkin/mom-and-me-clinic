export default function NavBar() {
  return (
    <nav className={`frosted-glass top-0 transition-top duration-500 ease-in-out bg-gray-200 shadow shadow-gray-300 w-screen sticky md:px-auto px-8 z-50`}>
      <div className="flex items-center">
        <div className="h-16 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <div className="text-indigo-500 md:order-1">
            {/* Heroicon - Chip Outline */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="text-gray-500 hidden w-full md:block md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
                      {/* Active Link = text-indigo-500
                      Inactive Link = hover:text-indigo-500 */}
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Know Your Doctors</a></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Clinic Location</a></li>
              {/* Move this to the float right */}
              {/* <li className="md:px-4 md:py-2 hover:bg-indigo-500 rounded-md bg-indigo-600 text-white"><a href="#">Set an Appointment</a></li> */}
            </ul>
          </div>
          <div className="md:order-3 order-2">
            <a href="#" className="md:px-4 md:py-2 p-2 hover:bg-indigo-500 rounded-md text-sm font-semibold bg-indigo-600 text-white">Set an Appointment</a>
          </div>
        </div>
      </div>
    </nav>
  )
}