import { Skeleton } from '@/components/ui/skeleton';
import { shadcn } from '@/shared/utilities/shadcn';

interface LoadingDoctorProps extends React.ComponentProps<"div"> {}

export default function LoadingDoctor({className}: LoadingDoctorProps) {
  return (
    <div
      className={shadcn("bg-white-coffee rounded-lg", className)}
    >
      <div
        className="ml-4 mr-2 md:mr-4 flex items-center gap-2 md:gap-4 my-2 md:my-4"
      >
         <Skeleton className="rounded-full w-[140px] h-[100px] bg-gray-100" />
         <div
          className="flex w-full flex-col gap-2"
         >
          <Skeleton className="h-6 w-[250px] bg-gray-100 flex-shrink" />
          <Skeleton className="h-4 w-[200px] bg-gray-100 flex-shrink" />
         </div>
      </div>
    </div>
  )
}