import AppointmentForm from "@/components/AppointmentForm";
import AppointmentFormMT from "@/components/AppointmentFormMT";
import Link from "next/link";

interface AppointmentPageParams {
  backNav: string;
  defaultService: string;
  defaultDoctor: string;
}

// export async function getServerSideProps(context: any) {
//   const pageContext = context.query as AppointmentPageContext;
//   return {
//     props: {
//       pageContext
//     }
//   }
// }

// export const getServerSideProps: GetServerSideProps<AppointmentPageContext, ParsedUrlQuery> = async(context) => {
//   const query = context.req as AppointmentPageContext;
// }

export default function Page({
  searchParams
}: {
  searchParams: AppointmentPageParams
}) {
  const backNavString = `/${searchParams.backNav ?? ''}`;
  return (
    <main className="h-screen">
      <div className="h-full w-full flex flex-row justify-center p-4">
        <div className="pt-4 rounded-lg bg-white-ivory  w-full h-full xl:basis-1/2">
          <Link className="px-8 text-gray-650" href={backNavString} scroll={false}>
            <span aria-hidden="true">←</span> Cancel Booking
          </Link>
          <div className="py-8 px-0 sm:px-8">
            {/* <AppointmentForm
              defaultServiceName={searchParams.defaultService} 
              defaultDoctorName={searchParams.defaultDoctor}
            /> */}

            <AppointmentFormMT
              defaultServiceName={searchParams.defaultService} 
              defaultDoctorName={searchParams.defaultDoctor}
            />
          </div>
        </div>
      </div>
    </main>
  )
}