import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingServices() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({length: 12}, (_, i) => i + 1).map((id) =>(
        <div 
          key={id}
          className="flex flex-col items-start justify-between bg-white-coffee rounded-xl  pt-4 pr-4 pl-4 md:pt-6 md:pr-6 md:pl-6">
          <Skeleton className="h-6 w-[350px] bg-gray-100" />
          <div className="py-1.5 mb-1.5">
            <Skeleton className="h-8 w-[350px] bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  )
}