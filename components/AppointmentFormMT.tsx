"use client";

import { useState } from "react";
import { Step, Stepper } from "./material-tailwind-export/MaterialTailwindExport";
import { AppointmentFormMTInterface, PersonalDetailsMTFormInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import PersonalDetailsForm from "./appointmentFormComponents/PersonalDetailsForm";
import ServiceSelection from "./appointmentFormComponents/ServiceSelection";
import { ServiceClass } from "@/classes/service";
import DoctorSelection from "./appointmentFormComponents/DoctorSelection";
import { DoctorClass } from "@/classes/doctor";
import VisitScheduleSelection from "./appointmentFormComponents/VisitScheduleSelection";
import { defaultLocation } from "@/utilities/constants";
import ConfirmationStep from "./appointmentFormComponents/ConfirmationStep";
import { Typography } from "@material-tailwind/react";

interface AppointmentFormMTProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentFormMT({defaultServiceName, defaultDoctorName}: AppointmentFormMTProps) {
  const [ activeStep, setActiveStep ] = useState(0);
  const [ isLastStep, setIsLastStep ] = useState(false);
  const [ isFirstStep, setIsFirstStep ] = useState(false);
  
  const [ appointmentForm, setAppointmentForm] = useState<AppointmentFormMTInterface>({
    personalDetails: undefined,
    selectedService: undefined,
    selectedDoctor: undefined,
    visitSchedule: undefined
  });

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const getAvailableTimeBlocks = (date?: Date, doctor?: DoctorClass): string[] => {
    const clinicSchedule = doctor?.clinicSchedules
      .find(clinicSchedule => clinicSchedule.clinicLocation === defaultLocation);

    if (!date || !clinicSchedule) {
      return [];
    }

    const dateDay = date?.getDay();
    //currently only retrieving one time but, but in the future we will
    //enable multiple timeblocks in a given day
    const timeBlocksInAGivenDay = clinicSchedule
      .schedules
      .find(schedule => schedule.dayToNumberMap[schedule.day] === dateDay);

    return [`${timeBlocksInAGivenDay?.start} - ${timeBlocksInAGivenDay?.end}`];
  }

  return (
    <div className="space-y-8">
      <div className="px-4 sm:px-0">
        <Stepper
          lineClassName="bg-white-coffee"
          activeLineClassName="bg-pastel-pink"
          activeStep={activeStep}
        >
          <Step 
            className="w-6 h-6"
            activeClassName="bg-pastel-pink text-white"
            completedClassName="bg-pastel-pink text-white"
          >
            <Typography variant="small" color="inherit">1</Typography>
          </Step>
          <Step 
            className="w-6 h-6 bg-white-coffee text-gray-650"
            activeClassName="bg-pastel-pink text-white"
            completedClassName="bg-pastel-pink text-white"
          >
            <Typography variant="small" color="inherit">2</Typography>
          </Step>
          <Step 
            className="w-6 h-6 bg-white-coffee text-gray-650"
            activeClassName="bg-pastel-pink text-white"
            completedClassName="bg-pastel-pink text-white"
          >
            <Typography variant="small" color="inherit">3</Typography>
          </Step>
          <Step 
            className="w-6 h-6 bg-white-coffee text-gray-650"
            activeClassName="bg-pastel-pink text-white"
            completedClassName="bg-pastel-pink text-white"
          >
            <Typography variant="small" color="inherit">4</Typography>
          </Step>
          <Step 
            className="w-6 h-6 bg-white-coffee text-gray-650"
            activeClassName="bg-pastel-pink text-white"
            completedClassName="bg-pastel-pink text-white"
          >
            <Typography variant="small" color="inherit">5</Typography>
          </Step>
        </Stepper>
      </div>
      <div className="col-span-3">
        {activeStep === 0 && (
          // <ServiceSelection
          //   defaultSelected={appointmentForm.selectedService}
          //   handleFormSubmit={(serviceSelection: ServiceClass) => {
          //     setAppointmentForm(form => ({
          //       ...form,
          //       selectedService: serviceSelection
          //     }));
          //     setActiveStep((cur) => cur + 1);
          //   }}
          // />
          <ConfirmationStep
            form={appointmentForm}
          />
        )}

        {activeStep === 1 && appointmentForm.selectedService && (
          <DoctorSelection 
            defaultSelected={appointmentForm.selectedDoctor}
            selectedService={appointmentForm.selectedService}
            handleFormSubmit={(doctorSelection: DoctorClass) => {
              setAppointmentForm(form => ({
                ...form,
                selectedDoctor: doctorSelection
              }));
              setActiveStep((cur) => cur + 1);
            }}
            handleBack={() => {
              setAppointmentForm(form => ({
                ...form,
                selectedDoctor: undefined
              }))
              setActiveStep((cur) => cur - 1);
            }}
          />
        )}
        {activeStep === 2 && appointmentForm.selectedDoctor && (
          <VisitScheduleSelection 
            defaultAvailableTimeBlocks={getAvailableTimeBlocks(appointmentForm.visitSchedule?.preferredDate, appointmentForm.selectedDoctor)}
            defaultSelected={appointmentForm.visitSchedule}
            selectedDoctor={appointmentForm.selectedDoctor}
            handleFormSubmit={(visitSchedule: VisitScheduleMTInterface) => {
              setAppointmentForm(form => ({
                ...form,
                visitSchedule: visitSchedule
              }));
          
              setActiveStep((cur) => cur + 1);
            }}
            handleBack={() => {
              setAppointmentForm(form => ({
                ...form,
                visitSchedule: undefined
              }));
              setActiveStep((cur) => cur - 1)
            }}
          />
        )}
        {activeStep === 3 && (
          <PersonalDetailsForm 
            handleFormSubmit={(personalDetails: PersonalDetailsMTFormInterface) => {
              setAppointmentForm(form => ({
                ...form,
                personalDetails: personalDetails
              }));
              setActiveStep((cur) => cur + 1);
            }}
            handleBack={() => {
              setActiveStep((cur) => cur - 1)
            }}
          />
        )}

        {activeStep === 4 && (
          <ConfirmationStep
            form={appointmentForm}
          />
        )}
      </div>
    </div>
  );
}