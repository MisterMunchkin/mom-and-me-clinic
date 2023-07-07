import { ClinicScheduleClass, Day } from "@/classes/doctor";
import { ScheduleClass } from '../../classes/doctor';
import { getEnumKeyByValue } from "@/utilities/helpers";

interface ClinicScheduleProps {
  clinicSchedules: ClinicScheduleClass[];
}

export default function ClinicSchedules({clinicSchedules}: ClinicScheduleProps) {
  return (
    <>
      {clinicSchedules.map(({clinicLocation, schedules}: ClinicScheduleClass) => (
        <div
          key={clinicLocation}
        >
          <span 
            className="font-bold text-base text-gray-900">
            {clinicLocation}
          </span>
          {schedules.map(({day, start, end}: ScheduleClass, index) => (
            <div
              key={`${index}_${clinicLocation}_${day}_${start}_${end}`}
              className="text-sm text-gray-900"
            >
              <span className="font-semibold">{getEnumKeyByValue(Day, day)}: </span>
              <span className="font-normal">{`${start} - ${end}`}</span><br />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}