import { Typography } from "@/shared/utilities/material-tailwind-export";
import Image from "next/image";
import confirmIcon from "../../public/booking-confirmation-icon.svg";
import lifeSaverImage from "../../public/lifesavers-waiting.png";
import Link from "next/link";

interface SuccessStepProps {
  name: string;
}

export default function SuccessStep({name}: SuccessStepProps) {
  return (
    <>
      <div
        className="flex flex-col items-center w-full"
      >
        <Typography variant="h3" className="font-bold text-gray-650 mb-12">
          Booking Confirmed!
        </Typography>

        <div
          className="rounded-xl border-none bg-pastel-green max-w-md pt-12 pb-16 px-6 sm:px-12 flex flex-col items-center text-center"
        >
          <Image 
            src={confirmIcon}
            alt="Booking Confirmed"
          />

          <Typography variant="h2" className="font-bold text-gray-650 mb-8 mt-8">
            Thank you for booking an appointment, {name}!
          </Typography>

          <Typography variant="small" className="font-normal text-gray-650 mb-8">
            For inquiries and concerns, you may contact us at &apos;office mobile number&apos;
            or &apos;office email&apos;
          </Typography>

          <Link
            href="/"
            className="py-3.5 rounded-full text-pastel-green bg-gray-650 shadow-none hover:shadow-gray-650/50 min-w-[18rem]"
          >
            <span className="button-text inline-flex items-center">
              Back to Home page
            </span>
          </Link>
        </div>

        <Image
          className="pb-24"
          src={lifeSaverImage}
          alt='lifesaver waiting image'
          width={500}
        />
      </div>
    </>
  );
}