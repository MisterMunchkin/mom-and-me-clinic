import { ClinicScheduleClass, DayNumber, DoctorClass } from "@/shared/classes/doctor";
import { VisitScheduleMTInterface } from "@/shared/interfaces/appointment";
import { toastNotifyService } from "@/shared/services/toast-notify-service";
import { defaultLocation } from "@/shared/utilities/constants";
import { toastConstants } from "@/shared/utilities/toast-constants";
import { Avatar, Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DoctorCard from "../doctors-section/DoctorCard";

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
  } = toastConstants.visisScheduleSelection.noSelectedVisit

  if (!doctorClinicSchedule) {
    return ( 
      <div>
        {selectedDoctor.name} does not have clinic schedules in {location}. Please select another doctor
      </div>
    );
  }

  const availableDayNumbers = doctorClinicSchedule.schedules.map(schedule => schedule.dayToNumberMap[schedule.day]);

  //will allow the calendar to disable dates/days where the doctor does not have any schedule
  const filterDatesByDoctorSchedule = (date: Date): boolean => {
    if (!availableDayNumbers) {
      return false;
    }

    const dateDay = date.getDay();
    return availableDayNumbers.includes(dateDay as DayNumber);
  }

  //When date changes, we need to change the timeblocks displayed
  const handleDateChange = (date: Date | null) => {
    if (!date) {
      return;
    }

    const availableTimeBlocks = getAvailableTimeBlocks(date, doctorClinicSchedule);
    setAvailableTimeBlocks(availableTimeBlocks);

    //should select the first timeblock in available
    setVisitSchedule(form => ({
      preferredTimeBlock: availableTimeBlocks[0],
      preferredDate: date
    }));
  }

  const getAvailableTimeBlocks = (date: Date, clinicSchedule: ClinicScheduleClass): string[] => {
    const dateDay = date?.getDay();
    //currently only retrieving one time but, but in the future we will
    //enable multiple timeblocks in a given day
    const timeBlocksInAGivenDay = doctorClinicSchedule
      .schedules
      .find(schedule => schedule.dayToNumberMap[schedule.day] === dateDay);

    return [`${timeBlocksInAGivenDay?.start} - ${timeBlocksInAGivenDay?.end}`];
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
              <DatePicker 
                id="preferredDate"
                className="rounded-lg border-gray-650 p-3 text-sm"
                selected={visitSchedule?.preferredDate}
                filterDate={filterDatesByDoctorSchedule}
                onChange={handleDateChange} 
                minDate={new Date()}
                inline
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