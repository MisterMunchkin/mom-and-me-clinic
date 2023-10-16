import { DoctorClass } from "@/shared/classes/doctor";
import { DoctorInterface } from "@/shared/interfaces/doctor";
import { shadcn } from "@/shared/utilities/shadcn";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import Image from 'next/image';

interface DoctorProps extends React.ComponentProps<"div"> {
  data: DoctorInterface;
}

export default function DoctorCard({data, className, onClick}: DoctorProps) {
  const doctor = DoctorClass.fromInterface(data);

  return (
    <Card
      key={doctor.name}
      onClick={onClick}
      shadow={false}
      className={shadcn("bg-white-coffee border-white-coffee min-h-[8rem] min-w-[20rem]", className)}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="ml-4 mr-2 md:mr-4 flex items-center gap-2 md:gap-4 my-2 md:my-4"
      >
        <Image 
          className='rounded-full'
          src={doctor.picture} 
          alt={doctor.name}
          width={100}
          height={100}                
        />
        <div
          className="flex w-full flex-col gap-0.5"
        >
          <div
            className="flex items-center justify-between"
          >
            <Typography
              variant="h6"
              className="text-gray-650 break-words"
            >
              {doctor.fullTitle}
            </Typography>
          </div>

          <Typography variant="small" className="text-gray-650">
            {doctor.serviceTagsForDisplay}
          </Typography>
        </div>
      </CardHeader>
      {/* <CardBody className="pt-0">
        <ClinicSchedules>
        </ClinicSchedules>
      </CardBody> */}
    </Card>
  );
}