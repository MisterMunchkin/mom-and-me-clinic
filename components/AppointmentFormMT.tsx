"use client";

import { useState } from "react";
import { Step, Stepper } from "./material-tailwind-export/MaterialTailwindExport";
import { PersonalDetailsMTFormInterface } from "@/interfaces/appointment";
import PersonalDetailsForm from "./appointmentFormComponents/PersonalDetailsForm";
import ServiceSelection from "./appointmentFormComponents/ServiceSelection";
import { ServiceClass } from "@/classes/service";

interface AppointmentFormMTProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentFormMT({defaultServiceName, defaultDoctorName}: AppointmentFormMTProps) {
  const [ activeStep, setActiveStep ] = useState(0);
  const [ isLastStep, setIsLastStep ] = useState(false);
  const [ isFirstStep, setIsFirstStep ] = useState(false);

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handlePersonDetailsSubmit = (personalDetails: PersonalDetailsMTFormInterface) => {
    console.log(personalDetails);
    setActiveStep((cur) => cur + 1);
  }

  const handleServiceSelectionSubmit = (serviceSelection: ServiceClass) => {
    console.log(serviceSelection);
    setActiveStep((cur) => cur + 1);
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

      {activeStep === 1 && (
        <p>to be created</p>
      )}
      {activeStep === 2 && (
        <p>to be created</p>
      )}
      {activeStep === 3 && (
        <p>to be created</p>
      )}

      {activeStep === 4 && (
        <PersonalDetailsForm 
          handleFormSubmit={handlePersonDetailsSubmit}
        />
      )}
    </div>
  );
}