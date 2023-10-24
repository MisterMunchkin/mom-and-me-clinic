import { Typography } from "@/shared/utilities/material-tailwind-export";
import Image from "next/image";
import PlantIcon from "@/public/lifesavers_plant_5.png"
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import CraneIcon from '@/public/icons/crane.svg';
import Link from 'next/link';

export default function Hero() {
  return (
    <React.Fragment>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-col items-center space-y-6">
          <Image
            src={PlantIcon}
            alt='Plant 5'
            width={70}
            priority
          />

          <Typography
            variant="h1"
            className="font-extrabold text-gray-650 text-center"
          >
            How are you feeling today?
          </Typography>
          <Typography
            className="font-normal text-gray-650 text-center text-base whitespace-break-spaces"
          >
            Women      ⁕      Kids      ⁕      Teens
          </Typography>

          <div className="mt-10 flex space-x-4 md:space-x-16 items-center justify-center pt-2">
            <div
              className="relative"
            >
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