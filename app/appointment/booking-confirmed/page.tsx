import SuccessStep from "@/components/appointment-form-components/SuccessStep";

interface BookingConfirmedParams {
  patientFirstName: string;
}

export default function Page({
  searchParams
}: {
  searchParams: BookingConfirmedParams
}) {
  return (
    <>
      <main className="h-screen">
        <div className="h-full w-full flex flex-row justify-center p-4">
          <div className="py-8 px-0 sm:px-8">
            <SuccessStep 
              name={searchParams.patientFirstName}
            />
          </div>
        </div>
      </main>
    </>
  )
}