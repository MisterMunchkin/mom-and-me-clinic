'use client';

import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { AppointmentFormMTInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import { Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";

interface ConfirmationStepProps {
  form: AppointmentFormMTInterface;
}

export default function ConfirmationStep({form}: ConfirmationStepProps) {
  
  // if (!form.personalDetails) return <div>Personal details has not been added</div>
  // if (!form.selectedDoctor) return <div>Doctor has not been selected</div>
  // if (!form.selectedService) return <div>Service has not been selected</div>
  // if (!form.visitSchedule) return <div>Visit schedule has not been added</div>

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Typography variant="small" className="font-normal text-gray-650">
        Please check if all details are correct
      </Typography>

      <div className="rounded-xl border-white-coffee border-2 bg-white-ivory h-[42rem] pt-16 pb-6 px-6 relative">
        <Timeline className="w-full text-center">
          <TimelineItem className="h-32">
            <TimelineConnector />
            <TimelineHeader className="h-3">
              <TimelineIcon className="bg-pastel-pink" />
              <div className="flex flex-col items-center">
                <Typography variant="small" className="leading-none text-gray-650">
                  Booking for
                </Typography>
                <Typography
                    variant="h6"
                    className="font-bold text-gray-650"
                  >
                  Prenatal Checkup
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
          <TimelineItem className="h-32">
            {/* <TimelineConnector /> */}
            <TimelineHeader className="h-3">
              <TimelineIcon className="bg-pastel-pink" />
              <div className="bg-pastel-pink p-3 rounded-xl flex flex-col items-center">
                <Typography variant="h6" className="text-white font-bold">
                  July 29, 2023
                </Typography>
                <Typography variant="h6" className="text-white font-bold">
                  9:00 AM - 12:00 NN
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}