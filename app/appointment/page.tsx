import AppointmentForm from "@/components/AppointmentForm";
import Link from "next/link";

interface AppointmentPageParams {
  backNav: string;
  test: string;
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
  console.log(searchParams);
  return (
    <div className="rounded-lg bg-white shadow-lg pt-4 lg:pt-8">
      <Link className="px-8 lg:px-12" href={backNavString} scroll={false}>
        <span aria-hidden="true">←</span> Go Back
      </Link>
      <div className="p-8 lg:col-span-3 lg:p-12">
        <AppointmentForm />
      </div>
    </div>
  )
}