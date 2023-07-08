"use client";

import { useEffect, useState } from "react";
import { Button, Step, Stepper } from "./material-tailwind-export/MaterialTailwindExport";

interface AppointmentFormMTProps {
  defaultServiceName?: string;
  defaultDoctorName?: string;
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function AppointmentFormMT({defaultServiceName, defaultDoctorName}: AppointmentFormMTProps) {
  const [ activeStep, setActiveStep ] = useState(0);
  const [ isLastStep, setIsLastStep ] = useState(false);
  const [ isFirstStep, setIsFirstStep ] = useState(false);

  // useEffect(() => {
  //   setActiveStep(0);
  //   setIsLastStep(false);
  //   setIsFirstStep(false);
  // }, [])

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <form className="space-y-12">
      <Stepper
        activeStep={activeStep}
      >
        <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
        <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
      </Stepper>

      {activeStep === 0 && (
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">Name</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">Age</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Age"
              type="number"
              id="age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="phone">Phone</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Phone Number"
              type="tel"
              id="phone"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </form>
  );
}