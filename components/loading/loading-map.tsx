import { Skeleton } from "../ui/skeleton";


export default function LoadingMap() {
  return (
    <div 
      className="bg-white-ivory h-[500px] w-screen sm:w-[500px] md:w-[600px] lg:w-[1000px] md:px-6 md:pb-6"
    >
      <Skeleton
        className="absolute inset-0 bg-gray-150"
      />
      <div className="flex flex-col p-4 overflow-y-hidden space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
          >
            <Skeleton 
              className="w-full h-[3rem] rounded-lg bg-gray-300 mb-2"
            />
            <Skeleton
              className="w-full h-[1rem] rounded-lg bg-gray-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}