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
  return (
    <>
      <Link href={backNavString} scroll={false}>
        <span aria-hidden="true">←</span> Go Back
      </Link>
      <h1>{searchParams.test}</h1>
    </>
  )
}