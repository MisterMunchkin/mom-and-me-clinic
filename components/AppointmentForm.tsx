"use client";

import { useState } from "react";
import { Step, Stepper } from "../shared/utilities/material-tailwind-export";
import { AppointmentFormInterface, PersonalDetailsFormInterface, VisitScheduleInterface } from "@/shared/interfaces/appointment.interface";
import PersonalDetailsForm from "./appointment-form-components/PersonalDetailsForm";
import ServiceSelection from "./appointment-form-components/ServiceSelection";
import { ServiceClass } from "@/shared/classes/service";
import DoctorSelection from "./appointment-form-components/DoctorSelection";
import { DoctorClass } from "@/shared/classes/doctor";
import VisitScheduleSelection from "./appointment-form-components/VisitScheduleSelection";
import { defaultLocation } from "@/shared/utilities/constants";
import ConfirmationStep from "./appointment-form-components/ConfirmationStep";
import { Typography } from "@material-tailwind/react";

interface AppointmentFormProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentForm({defaultServiceName, defaultDoctorName}: AppointmentFormProps) {
  const [ activeStep, setActiveStep ] = useState(0);
  const [ isLastStep, setIsLastStep ] = useState(false);
  const [ isFirstStep, setIsFirstStep ] = useState(false);
  
  const [ appointmentForm, setAppointmentForm] = useState<AppointmentFormInterface>({
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
    <>
      <div className="space-y-4">
        <div>
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
            <ServiceSelection
              defaultSelected={appointmentForm.selectedService}
              handleFormSubmit={(serviceSelection: ServiceClass) => {
                setAppointmentForm(form => ({
                  ...form,
                  selectedService: serviceSelection
                }));
                setActiveStep((cur) => cur + 1);
              }}
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
              handleFormSubmit={(visitSchedule: VisitScheduleInterface) => {
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
              defaultPersonalDetails={appointmentForm.personalDetails}
              handleFormSubmit={(personalDetails: PersonalDetailsFormInterface) => {
                setAppointmentForm(form => ({
                  ...form,
                  personalDetails: personalDetails
                }));
                setActiveStep((cur) => cur + 1);
              }}
              handleBack={(snapshot) => {
                setAppointmentForm(form => ({
                  ...form,
                  personalDetails: snapshot
                }))
                setActiveStep((cur) => cur - 1);
              }}
            />
          )}

          {activeStep === 4 && (
            <ConfirmationStep
              handleBack={() => {
                setActiveStep((cur) => cur - 1)
              }}
              form={appointmentForm}
            />
          )}
        </div>
      </div>
    </>
  );
}