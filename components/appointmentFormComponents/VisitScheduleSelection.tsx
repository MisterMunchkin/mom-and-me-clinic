import { ClinicScheduleClass, DayNumber, DoctorClass } from "@/classes/doctor";
import { VisitScheduleMTInterface } from "@/interfaces/appointment";
import { defaultLocation } from "@/utilities/constants";
import { Avatar, Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
  const [ availableTimeBlocks, setAvailableTimeBlocks ] = useState<string[]>(defaultAvailableTimeBlocks)

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
      return;
    }

    handleFormSubmit(visitSchedule);
  }

  return (
    <div 
      className="flex flex-col space-y-12"
    > 
      <div className="flex flex-col items-center space-y-8 w-full">
        <Card color="transparent" shadow={false} className=" border-gray-300 border">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="ml-4 mr-8 flex items-center gap-4 my-4"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt={selectedDoctor.name}
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {selectedDoctor.fullTitle}
                </Typography>
              </div>

              <Typography color="blue-gray">{selectedDoctor.joinedServiceTags}</Typography>
            </div>
          </CardHeader>
        </Card>
        <div 
          className="flex flex-col space-y-4 items-center md:items-start md:flex-row md:space-y-0 md:justify-around md:w-full"
        >
          <div className="flex flex-col items-center">
            <Typography variant="h5" color="blue-gray" className="mb-3">Choose Visit Schedule</Typography>
            <DatePicker 
              id="preferredDate"
              className="rounded-lg border-gray-200 p-3 text-sm"
              selected={visitSchedule?.preferredDate}
              filterDate={filterDatesByDoctorSchedule}
              onChange={handleDateChange} 
              minDate={new Date()}
              inline
            />
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="h5" color="blue-gray" className="mb-3">Preferred Time</Typography>
            <div className="flex md:flex-col md:items-center">
              {availableTimeBlocks?.map((timeBlock) => (
                <Card
                  key={timeBlock}
                  className={`${visitSchedule?.preferredTimeBlock === timeBlock ? 'ring-primary ring-4' : ''}
                  hover:cursor-pointer block w-full`}
                  onClick={() => setVisitSchedule(form => ({
                    preferredDate: form?.preferredDate,
                    preferredTimeBlock: timeBlock
                  }))}
                >
                  <CardBody
                    className="p-3"
                  >
                    <Typography variant="h6" color="blue-gray">{timeBlock}</Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-y-4">
        <Button
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2"
          type="button"
          onClick={() => handleNext()}
        >
          Next
        </Button>
        <Button
          className="max-w-[24rem] col-span-4 md:col-start-2 md:col-span-2"
          type="button"
          onClick={() => handleBack()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}