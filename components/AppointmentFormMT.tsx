"use client";

import { useState } from "react";
import { Step, Stepper } from "./material-tailwind-export/MaterialTailwindExport";
import { AppointmentFormMTInterface, PersonalDetailsMTFormInterface } from "@/interfaces/appointment";
import PersonalDetailsForm from "./appointmentFormComponents/PersonalDetailsForm";
import ServiceSelection from "./appointmentFormComponents/ServiceSelection";
import { ServiceClass } from "@/classes/service";
import DoctorSelection from "./appointmentFormComponents/DoctorSelection";
import { DoctorClass } from "@/classes/doctor";

import * as yup from "yup";
import { useForm } from "react-hook-form";

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
    selectedDoctor: undefined
  });


  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handlePersonDetailsSubmit = (personalDetails: PersonalDetailsMTFormInterface) => {
    console.log(personalDetails);
    setAppointmentForm(form => ({
      ...form,
      personalDetails: personalDetails
    }));
    setActiveStep((cur) => cur + 1);
  }

  const handleServiceSelectionSubmit = (serviceSelection: ServiceClass) => {
    setAppointmentForm(form => ({
      ...form,
      selectedService: serviceSelection
    }));
    setActiveStep((cur) => cur + 1);
  }

  const handleDoctorSelectionSubmit = (doctorSelection: DoctorClass) => {
    console.log(doctorSelection);
    setAppointmentForm(form => ({
      ...form,
      selectedDoctor: doctorSelection
    }));
  }

  return (
    <div className="space-y-8">
      <Stepper
        activeStep={activeStep}
      >
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
        <Step className="h-4 w-4" />
      </Stepper>

      {activeStep === 0 && (
        <ServiceSelection
          handleFormSubmit={handleServiceSelectionSubmit}
        />
      )}

      {activeStep === 1 && appointmentForm.selectedService && (
        <DoctorSelection 
          selectedService={appointmentForm.selectedService}
          handleFormSubmit={handleDoctorSelectionSubmit}
        />
      )}
      {activeStep === 2 && (
        <p>to be created</p>
      )}
      {activeStep === 3 && (
        <PersonalDetailsForm 
          handleFormSubmit={handlePersonDetailsSubmit}
        />
      )}

      {activeStep === 4 && (
        <p>to be created</p>
      )}
    </div>
  );
}