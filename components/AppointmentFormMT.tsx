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

  return (
    <div className="space-y-8">
      <Stepper
        activeStep={activeStep}
      >
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
      </Stepper>

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
            setActiveStep((cur) => cur - 1);
          }}
        />
      )}
      {activeStep === 2 && appointmentForm.selectedDoctor && (
        <VisitScheduleSelection 
          selectedDoctor={appointmentForm.selectedDoctor}
          handleFormSubmit={(visitSchedule: VisitScheduleMTInterface) => {
            setAppointmentForm(form => ({
              ...form,
              visitSchedule: visitSchedule
            }));
        
            setActiveStep((cur) => cur + 1);
          }}
          handleBack={() => {
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
        <p>to be created</p>
      )}
    </div>
  );
}