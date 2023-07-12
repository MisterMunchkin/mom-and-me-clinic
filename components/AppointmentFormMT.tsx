"use client";

import { useState } from "react";
import { Step, Stepper } from "./material-tailwind-export/MaterialTailwindExport";
import { PersonalDetailsMTFormInterface } from "@/interfaces/appointment";
import PersonalDetailsForm from "./appointmentFormComponents/PersonalDetailsForm";

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
        <PersonalDetailsForm 
          handleFormSubmit={handlePersonDetailsSubmit}
        />
      )}
    </div>
  );
}