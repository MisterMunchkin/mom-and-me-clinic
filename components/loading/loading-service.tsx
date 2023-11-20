import { Skeleton } from '@/components/ui/skeleton';
export default function LoadingService() {
  return (
    <div
      className="p-4 w-min-[24rem] bg-white-coffee rounded-lg text-center"
    >
      <div className="flex flex-col flex-1 items-start justify-between space-y-2">
        <Skeleton className="h-4 w-[200px] bg-gray-100 flex-shrink" />
        <Skeleton className="h-6 w-[250px] bg-gray-100 flex-shrink" />
      </div>
    </div>
  )
}