import { Typography } from "@/utilities/material-tailwind-export";
import Link from "next/link";
import Image from "next/image";
import PlantIcon from "@/public/lifesavers_plant_5.png"
import EventIcon from "@mui/icons-material/Event";

export default function Hero() {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-2xl flex flex-col items-center space-y-6">
        <Image
          src={PlantIcon}
          alt='Plant 5'
          width={70}
        />

        <Typography
          variant="h1"
          className="font-extrabold text-gray-650 text-center"
        >
          How are you feeling today?
        </Typography>

        <div className="mt-10 flex space-x-4 md:space-x-16 items-center justify-center pt-6">
          <Link 
            href={{
              pathname: `/appointment`
            }} 
            className="py-2 px-6 rounded-full bg-pastel-pink text-white-ivory hover:shadow-lg hover:shadow-pastel-pink/50">
            <span
              className="button-text items-center"
            >
              <EventIcon className="w-5 h-5 display-inline mr-3" />
              <span className="font-semibold tracking-wider text-sm">Book Appointment</span>
            </span>
          </Link>
          <Link href="#services" className="underline underline-offset-4">
            <Typography
              variant="small"
              className="font-normal tracking-wider"
            >
              Browse Services <span aria-hidden="true">→</span>
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}