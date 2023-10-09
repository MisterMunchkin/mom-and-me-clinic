import { DoctorClass } from "@/shared/classes/doctor";
import { ServiceClass } from "@/shared/classes/service";
import { Avatar, Button, Card, CardBody, CardHeader, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toastNotifyService } from "@/shared/services/toast-notify-service";
import { toastConstants } from "@/shared/utilities/toast-constants";
import { getDoctorsURL } from "@/shared/services/api-service.constants";
import { DoctorInterface } from "@/shared/interfaces/doctor";

interface DoctorSelectionProps {
  defaultSelected?: DoctorClass;
  selectedService: ServiceClass;
  handleFormSubmit: (selectedDoctor: DoctorClass) => void;
  handleBack: () => void;
}

export default function DoctorSelection({defaultSelected, selectedService , handleFormSubmit, handleBack}: DoctorSelectionProps) {
  // const { data, error, isLoading } = useSWR<DoctorClass[], any>(() => '/api/doctors?serviceTags=' + selectedService.joinedTags, fetcher);
  const [ doctors, setDoctors ] = useState<DoctorClass[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorClass | undefined>(defaultSelected);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const { 
    toastId,
    message
  } = toastConstants.doctorSelection.noSelectedDoctor

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getDoctorsURL(selectedService.joinedTags));
      if (!res.ok) {
        throw new Error ("failed to fetch doctors");
      }

      const datas = await res.json() as DoctorInterface[];
      setDoctors(datas.map(data => DoctorClass.fromInterface(data)));
      setIsLoading(false);
      console.log(datas);
    }

    fetchData();
  }, [selectedService.joinedTags]);
  
  const handleNext = () => {
    if (!selectedDoctor) {
      //display message or error: needs to select a doctor
      toastNotifyService.notifyWarning(toastId, message);
      return;
    }

    toastNotifyService.dismiss(toastId);
    handleFormSubmit(selectedDoctor);
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* timeline */}
        <Timeline className="w-full">
          <TimelineItem>
            <TimelineConnector className="" />
            <TimelineHeader className="h-3">
              <TimelineIcon className="bg-pastel-pink" />
              <Typography variant="h6" className="leading-none text-gray-650">
                Service
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography
                  variant="small"
                  color="gray"
                  className="font-normal text-gray-650"
                >
                {selectedService.name}
              </Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineConnector className="" />
            <TimelineHeader className="h-3">
              <TimelineIcon className="bg-pastel-pink" />
              <Typography variant="h6" className="leading-none text-gray-650">
                Choose a doctor
              </Typography>
            </TimelineHeader>
          </TimelineItem>
        </Timeline>

        <div className="overflow-auto max-h-[75vh] md:max-h-[70vh] p-1 flex flex-col space-y-4">
          {/* {data.map((doctor) => (
            <Card 
              key={doctor.name}
              
              shadow={false} 
              onClick={() => setSelectedDoctor(doctor)}
              className={`${selectedDoctor?.name === doctor.name ? 'bg-melon' : 'bg-white-ivory'}
              border-melon border hover:cursor-pointer`}>
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
                  alt={doctor.name}
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Typography variant="h6" className="text-gray-650">
                      {doctor.fullTitle}
                    </Typography>
                  </div>

                  <Typography variant="small" className="text-gray-650">{doctor.joinedServiceTags}</Typography>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <ClinicSchedules 
                  clinicSchedules={doctor.clinicSchedules}
                />
              </CardBody>
            </Card>
          ))} */}
        </div>
        
        <div className="w-full grid grid-cols-4 pt-4">
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