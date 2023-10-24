import { AppointmentFormMTInterface } from "@/shared/interfaces/appointment";
import { Avatar, Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Image from 'next/image';
import lifeSaverImage from '../../public/lifesavers_consulting.png';
import { monthNames } from "@/shared/utilities/constants";
import { AppointmentSubmitRequest } from "@/shared/classes/appointment-submit-request";
import { toastNotifyService } from "@/shared/services/toast-notify-service";
import { toastConstants } from "@/shared/utilities/toast-constants";
import { useRouter } from 'next/navigation';
import DoctorCard from "@/components/doctors-section/DoctorCard";

interface ConfirmationStepProps {
  form: AppointmentFormMTInterface;
  handleBack: () => void;
}

export default function ConfirmationStep({form, handleBack}: ConfirmationStepProps) {
  const {personalDetails, selectedDoctor, selectedService, visitSchedule} = form;
  const { 
    toastId,
    message
  } = toastConstants.confirmationStep.submitError;
  const router = useRouter();

  if (!personalDetails) return <div>Personal details has not been added</div>
  if (!selectedDoctor) return <div>Doctor has not been selected</div>
  if (!selectedService) return <div>Service has not been selected</div>
  if (!visitSchedule || !visitSchedule.preferredDate || !visitSchedule.preferredTimeBlock) return <div>Visit schedule has not been added</div>

  const { preferredDate, preferredTimeBlock } = visitSchedule;
  const handleSubmit = async () => {
    try {
      const appointmentSubmitRequest = new AppointmentSubmitRequest(
        personalDetails,
        selectedService,
        selectedDoctor,
        visitSchedule
      );
      
      const response = await fetch('/api/submit-appointment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentSubmitRequest)
      });

      if (response.status !== 200) {
        let body = await response.json();
        console.error(body);
        throw new Error(body);
      }

      // display success
      toastNotifyService.dismiss(toastId);
      setTimeout(() => {
        router.push(`appointment/booking-confirmed?patientFirstName=${personalDetails.firstName}`);
      }, 250);
    } catch (error: any) {
      // display failure
      toastNotifyService
        .notifyError(toastId, message);
    }
  }

  return (
    <>
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
              {selectedService.name}
            </Typography>
          </div>

          <div className="h-[50px] w-[2px] bg-white-coffee my-3"></div>

          <div className="bg-pastel-pink py-3 px-5 rounded-xl flex flex-col items-center max-w-xs">
            <Typography variant="h5" className="text-white font-bold">
              {`${monthNames[preferredDate.getMonth()]} ${preferredDate.getDate()}, ${preferredDate.getFullYear()}`}
            </Typography>
            <Typography variant="h5" className="text-white font-bold">
              {preferredTimeBlock}
            </Typography>
          </div>

          <div className="h-[50px] w-[2px] bg-white-coffee my-3"></div>

          <div className="flex flex-col items-center px-3 pb-3 pt-1">
            <Typography variant="small" className="leading-none text-gray-650 pb-3">
              Your Doctor
            </Typography>

            <DoctorCard 
              data={selectedDoctor}
            />
          </div>

        </div>

        <Button
          className="py-3.5 mt-16 rounded-full text-gray-650 bg-pastel-green shadow-none hover:shadow-lg hover:shadow-pastel-green/50 min-w-[18rem]"
          type="button"
          onClick={() => handleSubmit()}
        >
          <span className="button-text inline-flex items-center">
            <CheckBadgeIcon className="w-5 h-5 display-inline mr-3" /> 

            Confirm 
          </span>
        </Button>
        <Button
          variant="text"
          className="text-gray-650 hover:bg-white-ivory underline underline-offset-4"
          type="button"
          onClick={() => handleBack()}
        >
          <span className="button-text underline underline-offset-4">Back</span>
        </Button>

        <Image 
          className="pt-12"
          src={lifeSaverImage}
          alt='lifesaver consulting image'
          width={500}
        />
      </div>
    </>
  );
}