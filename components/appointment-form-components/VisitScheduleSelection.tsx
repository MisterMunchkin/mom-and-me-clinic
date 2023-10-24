import { ClinicScheduleClass, DoctorClass } from "@/shared/classes/doctor";
import { VisitScheduleMTInterface } from "@/shared/interfaces/appointment";
import { toastNotifyService } from "@/shared/services/toast-notify-service";
import { defaultLocation } from "@/shared/utilities/constants";
import { toastConstants } from "@/shared/utilities/toast-constants";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import DoctorCard from "../doctors-section/DoctorCard";
import { DateBefore, Matcher, SelectSingleEventHandler } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface VisitScheduleSelectionProps {
  defaultAvailableTimeBlocks: string[];
  defaultSelected?: VisitScheduleMTInterface;
  selectedDoctor: DoctorClass;
  handleFormSubmit: (selectedVisitSchedule: VisitScheduleMTInterface) => void;
  handleBack: () => void;
}

export default function VisitScheduleSelection({defaultAvailableTimeBlocks, defaultSelected, selectedDoctor, handleFormSubmit, handleBack}: VisitScheduleSelectionProps) {
  const [ visitSchedule, setVisitSchedule ] = useState<VisitScheduleMTInterface | undefined>(defaultSelected);
  // Set as constant for now, but in the future it should allow changing locations
  const location: string = defaultLocation;
  const doctorClinicSchedule: ClinicScheduleClass | undefined = selectedDoctor
    .clinicSchedules
    .find(clinicSchedule => clinicSchedule.clinicLocation === location);
  const [ availableTimeBlocks, setAvailableTimeBlocks ] = useState<string[]>(defaultAvailableTimeBlocks);
  const { 
    toastId,
    message
  } = toastConstants.visisScheduleSelection.noSelectedVisit;
  
  if (!doctorClinicSchedule) {
    return ( 
      <div>
        {selectedDoctor.name} does not have clinic schedules in {location}. Please select another doctor
      </div>
    );
  }

  /**
   * Configures the days that should be disabled in the Calendar.
   * Only future days and days that are available for the specific doctor are allowed
   */
  const disabledDayMatcher: Matcher[] = [
    { before: new Date() } as DateBefore,
    new Date(),
    doctorClinicSchedule.unAvailableDaysMatcher
  ]
  
  const onDayPickerSelected: SelectSingleEventHandler = (date: Date | undefined) => {
    if (!date) {
      return;
    }

    const availableTimeBlocks = doctorClinicSchedule.availableTimeBlocks(date);

    setAvailableTimeBlocks(availableTimeBlocks);
    setVisitSchedule(form => ({
      preferredTimeBlock: availableTimeBlocks[0],
      preferredDate: date
    }));
  }

  const handleNext = () => {
    if (!visitSchedule || !visitSchedule.preferredDate || !visitSchedule.preferredTimeBlock) {
      //should display alert message to user
      toastNotifyService.notifyWarning(toastId, message);
      return;
    }

    toastNotifyService.dismiss(toastId);
    handleFormSubmit(visitSchedule);
  }

  return (
    <>
      <div 
        className="flex flex-col space-y-12"
      > 
        <div className="flex flex-col items-center space-y-8 w-full">
          <DoctorCard
            data={selectedDoctor}
          />
          <div 
            className="flex flex-col space-y-4 items-center md:items-start md:flex-row md:space-y-0 md:justify-around md:w-full"
          >
            <div className="flex flex-col items-center">
              <Typography variant="h6" className="mb-3 text-gray-650">Choose Visit Schedule</Typography>
              <Calendar 
                mode="single"
                defaultMonth={defaultSelected?.preferredDate ?? new Date()}
                disabled={disabledDayMatcher}
                selected={visitSchedule?.preferredDate}
                onSelect={onDayPickerSelected}
              />
            </div>
            <div className="flex flex-col items-center">
              <Typography variant="h6" className="mb-3 text-gray-650">Preferred Time Slot</Typography>
              <div className="flex md:flex-col md:items-center">
                {availableTimeBlocks?.map((timeBlock) => (
                  <Card
                    key={timeBlock}
                    className={`${visitSchedule?.preferredTimeBlock === timeBlock ? 'bg-melon' : 'bg-white-coffee'}
                    hover:cursor-pointer block w-full`}
                    onClick={() => setVisitSchedule(form => ({
                      preferredDate: form?.preferredDate,
                      preferredTimeBlock: timeBlock
                    }))}
                  >
                    <CardBody
                      className="p-3"
                    >
                      <Typography variant="lead" className="text-sm text-gray-650">{timeBlock}</Typography>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-4">
          <Button
            className="col-span-4 md:col-start-2 md:col-span-2 rounded-full bg-pastel-pink shadow-none hover:shadow-lg hover:shadow-pastel-pink/50"
            type="button"
            onClick={() => handleNext()}
          >
            <span className="button-text">Go to next step <span aria-hidden="true">→</span></span> 
          </Button>
          <Button
            variant="text"
            className="col-span-4 md:col-start-2 md:col-span-2 text-gray-650 hover:bg-white-ivory"
            type="button"
            onClick={() => handleBack()}
          >
            <span className="button-text underline underline-offset-4">Back</span> 
          </Button>
        </div>
      </div>
    </>
  );
}