import { DoctorClass } from "@/classes/doctor";
import { ServiceClass } from "@/classes/service";
import { AppointmentFormMTInterface, VisitScheduleMTInterface } from "@/interfaces/appointment";
import { Typography } from "@material-tailwind/react";

interface ConfirmationStepProps {
  form: AppointmentFormMTInterface;
}

export default function ConfirmationStep({form}: ConfirmationStepProps) {
  
  if (!form.personalDetails) return <div>Personal details has not been added</div>
  if (!form.selectedDoctor) return <div>Doctor has not been selected</div>
  if (!form.selectedService) return <div>Service has not been selected</div>
  if (!form.visitSchedule) return <div>Visit schedule has not been added</div>

  return (
    <div className="flex flex-col space-y-4">
      <Typography variant="small" className="font-normal text-gray-650">
        Please check if all details are correct
      </Typography>
    </div>
  );
}