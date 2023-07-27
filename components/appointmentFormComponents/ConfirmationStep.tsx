'use client';

import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { AppointmentFormMTInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import { Avatar, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Image from 'next/image';
import lifeSaverImage from '../../public/lifesavers_consulting.png';

interface ConfirmationStepProps {
  form: AppointmentFormMTInterface;
}

export default function ConfirmationStep({form}: ConfirmationStepProps) {
  
  // if (!form.personalDetails) return <div>Personal details has not been added</div>
  // if (!form.selectedDoctor) return <div>Doctor has not been selected</div>
  // if (!form.selectedService) return <div>Service has not been selected</div>
  // if (!form.visitSchedule) return <div>Visit schedule has not been added</div>

  return (
    <div className="flex flex-col items-center w-full">
      <Typography variant="small" className="font-normal text-gray-650 mb-2">
        Please check if all details are correct
      </Typography>

      <div className="rounded-xl border-white-coffee border-2 bg-white-ivory max-w-md pt-8 pb-6 px-2 sm:px-8 flex flex-col items-center">

        <div className="flex flex-col items-center px-3 pt-3 pb-1">
          <Typography variant="small" className="leading-none text-gray-650">
            Booking for
          </Typography>
          <Typography
              variant="h5"
              className="font-bold text-gray-650"
            >
            Prenatal Checkup
          </Typography>
        </div>

        <div className="h-[50px] w-[2px] bg-white-coffee my-3"></div>

        <div className="bg-pastel-pink py-3 px-5 rounded-xl flex flex-col items-center max-w-xs">
          <Typography variant="h5" className="text-white font-bold">
            July 29, 2023
          </Typography>
          <Typography variant="h5" className="text-white font-bold">
            9:00 AM - 12:00 NN
          </Typography>
        </div>

        <div className="h-[50px] w-[2px] bg-white-coffee my-3"></div>

        <div className="flex flex-col items-center px-3 pb-3 pt-1">
          <Typography variant="small" className="leading-none text-gray-650 pb-3">
            Your Doctor
          </Typography>

          <Card color="transparent" shadow={false} className=" rounded-xl bg-white-coffee">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="ml-4 mr-4 flex items-center gap-4 my-4"
            >
              <Avatar
                size="lg"
                variant="circular"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="Test"
              />
              <div className="flex w-full flex-col gap-0.5">
                <Typography className="text-sm sm:text-base font-bold text-gray-650 leading-tight">
                  Dr. Thalia Tubungbanua MD, DPOGS
                </Typography>

                <Typography variant="small" className="text-gray-650">OBGYN</Typography>
              </div>
            </CardHeader>
          </Card>
        </div>

      </div>

      <Button
        className="inline-flex justify-center py-3.5 mt-16 rounded-full text-gray-650 bg-pastel-green shadow-none hover:shadow-lg hover:shadow-pastel-green/50 min-w-[18rem]"
        type="button"
        // onClick={() => handleNext()}
      >
        <CheckBadgeIcon className="w-4 h-4 display-inline mr-3" /> 
        Confirm 
      </Button>

      <Image 
        className="pt-12"
        src={lifeSaverImage}
        alt='lifesaver consulting image'
        width={500}
      />
    </div>
  );
}