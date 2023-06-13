export default function NavBar() {
    return (
      <nav className="bg-gray-200 shadow shadow-gray-300 w-screen px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <div className="text-indigo-500 md:order-1">
            {/* Heroicon - Chip Outline */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
                      {/* Active Link = text-indigo-500
                      Inactive Link = hover:text-indigo-500 */}
              <li className="md:px-4 md:py-2 text-indigo-500"><a href="#">Home</a></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Clinic Location</a></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Know Your Doctors</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
}