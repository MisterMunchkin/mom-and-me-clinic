import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingDoctors() {
  return (
    <div className="flex flex-row overflow-x-auto space-x-6">
      {Array.from({length: 4}, (_, i) => i + 1).map((id) => (
        <Skeleton
          key={id}
          className="min-h-[8rem] min-w-[20rem] bg-gray-100 rounded-lg flex p-2 md:p-4 items-center"
        >
          <Skeleton className="rounded-full w-[100px] h-[100px] bg-gray-300" />
          <div className="flex flex-col space-y-2 pl-4">
            <Skeleton className="h-4 w-[200px] bg-gray-300" />
            <Skeleton className="h-2 w-[100px] bg-gray-300" />
          </div>
        </Skeleton>
      ))}
    </div>
  ) 
}