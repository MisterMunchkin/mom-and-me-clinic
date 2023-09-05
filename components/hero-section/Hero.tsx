import { Typography } from "@/utilities/material-tailwind-export";
import Link from "next/link";
import Image from "next/image";
import PlantIcon from "@/public/lifesavers_plant_5.png"
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import React from "react";
import UnderconstructionIcon from '@/public/icons/under_construction.png';

export default function Hero() {
  return (
    <React.Fragment>
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
            <div
              className="relative"
            >
              <Image
                src={UnderconstructionIcon}
                width={35}
                height={35}
                alt="under_construction_icon"
                className="absolute bottom-0 left-0"
              />
              <Image
                src={UnderconstructionIcon}
                width={35}
                height={35}
                alt="under_construction_icon"
                className="absolute bottom-0 right-0"
              />
              <Link 
                href={{
                  pathname: `/appointment`
                }} 
                className="py-2 px-4 rounded-full bg-pastel-pink text-white-ivory hover:shadow-lg hover:shadow-pastel-pink/50">
                <span
                  className="button-text items-center"
                > 
                  <CalendarDaysIcon className="w-5 h-5 inline mr-3" />
                  <span className="font-semibold tracking-wider text-sm">Book Appointment</span>
                </span>
              </Link>
            </div>
            <a 
              href="#services" 
              className="underline underline-offset-4 hover:text-pastel-pink cursor-pointer">
              <span
                className="font-normal tracking-wider text-xs sm:text-sm"
              >
                Browse Services <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}